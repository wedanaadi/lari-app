import { ToastNotification } from "@/components/ToastNotification";
import { useFetchCardBox } from "@/features/dashboard"
import { ResetAuthValue } from "@/lib/auth";
import useStore from "@/store/useStore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigasi = useNavigate()
  const tokenLogin = useStore((state) => state.token)
  const actionLogin = useStore((state) => state.changeDataLogin)
  const {data: cardbox} = useFetchCardBox({
    token: tokenLogin,
    onError: (err) => {
      if (err.response) {
        let message = "Gagal load data card box"
        if (err.response.status === 401) {
          message = "Token login expired"
          actionLogin(ResetAuthValue)
          localStorage.clear()
          navigasi("/login");
        }
        ToastNotification({
          message,
          type: 'error'
        })
      }
    },
  })

  return (
    <div className="flex flex-wrap justify-around capitalize">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
        <div className="bg-blue-200 border border-blue-300 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-700">{cardbox?.data.total}</div>
          <div className="text-lg font-semibold text-blue-900">participants</div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
        <div className="bg-green-200 border border-green-300 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-700">{cardbox?.data.verified}</div>
          <div className="text-lg font-semibold text-green-900">Verified participants</div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
        <div className="bg-red-200 border border-red-300 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-700">{cardbox?.data.unverified}</div>
          <div className="text-lg font-semibold text-red-900">Unverified Participants</div>
        </div>
      </div>
    </div>

  )
}
