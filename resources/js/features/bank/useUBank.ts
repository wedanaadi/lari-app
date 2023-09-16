import { ToastNotification } from "@/components/ToastNotification"
import { ResetAuthValue } from "@/lib/auth"
import { axiosInstance } from "@/lib/axios"
import { TBankScheme } from "@/lib/types"
import useStore from "@/store/useStore"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

interface updateBankProps {
  body: TBankScheme,
  id:number
  token: string
}
const updateBankFn = async (Data: updateBankProps) => {
  const { data } = await axiosInstance.put(`/banks/${Data.id}`, Data.body, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${Data.token}`
    }
  })
  return data
}

type UpdateBankProps = {
  onSuccess: () => void,
}

export function useUpdateBank({onSuccess}:UpdateBankProps) {
  const actionLogin = useStore((state) => state.changeDataLogin)
  const navigasi = useNavigate()
  return useMutation({
    mutationFn: updateBankFn,
    onSuccess,
    onError: (err:AxiosError) => {
      if (err.response) {
        let message = err.response.statusText
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
}
