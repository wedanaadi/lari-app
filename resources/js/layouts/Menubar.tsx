import { useLogout } from "@/features/user";
import useStore from "@/store/useStore";
import { IoLogOutOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Menubar({ setOpen }: { setOpen: (value: boolean) => void }) {
  const navigasi = useNavigate()
  const token = useStore((state) => state.token)
  const actionLogin = useStore((state) => state.changeDataLogin)

  const {mutate:logout} = useLogout({
    onSuccess:() => {
      actionLogin({
        accessToken: "",
        user_data: {
          id: "",
          role: "",
          status: "",
          username: "",
          password: "",
          name: "",
          phone: "",
        }
      })
      localStorage.clear()
      navigasi("/login")
    }
  })

  const handleLogout = () => {
    // alert('okee');
    logout(token)
  }

  return (
    <div className="bg-white w-full text-gray shadow-xl">
      <div className="flex justify-between w-full items-center gap-2.5 font-medium border-b py-5 px-3 border-slate-300">
        <div className="flex items-center">
          <div className="m-3 md:hidden cursor-pointer" onClick={() => setOpen(true)}>
            <MdMenu size={25} />
          </div>
          <h1>&nbsp;</h1>
        </div>
        <div onClick={() => handleLogout()} className="cursor-pointer flex gap-x-2">
          <IoLogOutOutline size={23} className="min-w-max cursor-pointer" />
          Logout
        </div>
      </div>
    </div>
  )
}
