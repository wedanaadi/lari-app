import { ToastNotification } from "@/components/ToastNotification"
import { ResetAuthValue } from "@/lib/auth"
import { axiosInstance } from "@/lib/axios"
import { TEditUserScheme } from "@/lib/types"
import useStore from "@/store/useStore"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

interface FetchUserProps {
  body: TEditUserScheme,
  id:number
  token: string
}
const UpdateUser = async (Data: FetchUserProps) => {
  const { data } = await axiosInstance.put(`/users/${Data.id}`, Data.body,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${Data.token}`
    }
  })
  return data
}

type UpdateUserProps = {
  onSuccess: () => void,
}

export function useUpdateUser({onSuccess}:UpdateUserProps) {
  const actionLogin = useStore((state) => state.changeDataLogin)
  const navigasi = useNavigate()
  return useMutation({
    mutationFn: UpdateUser,
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
