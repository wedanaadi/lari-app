import { ToastNotification } from "@/components/ToastNotification"
import { ResetAuthValue } from "@/lib/auth"
import { axiosInstance } from "@/lib/axios"
import { TUserScheme } from "@/lib/types"
import useStore from "@/store/useStore"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

interface ICreateUserFn {
  body: TUserScheme,
  token: string
}

const CreateUser = async (Data: ICreateUserFn) => {
  const { data } = await axiosInstance.post(`/users`, Data.body,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${Data.token}`
    }
  })
  return data
}

type createUserProps = {
  onSuccess: () => void,
}

export function useCreateUser({onSuccess}:createUserProps) {
  const actionLogin = useStore((state) => state.changeDataLogin)
  const navigasi = useNavigate()
  return useMutation({
    mutationFn: CreateUser,
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
        if (err.response.status === 422) {
          message = "Username sudah digunakan!"
        }
        ToastNotification({
          message,
          type: 'error'
        })
      }
    },
  })
}
