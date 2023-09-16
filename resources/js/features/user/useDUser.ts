import { ToastNotification } from "@/components/ToastNotification"
import { ResetAuthValue } from "@/lib/auth"
import { axiosInstance } from "@/lib/axios"
import { TItemId } from "@/lib/types"
import useStore from "@/store/useStore"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

interface IDeleteUserFn {
  id: TItemId,
  token: string
}

const DeleteUserFn = async (Data: IDeleteUserFn) => {
  const { data } = await axiosInstance.delete(`/users/${Data.id}`,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${Data.token}`
    }
  })
  return data
}

type DeleteUserProps = {
  onSuccess: () => void,
}

export function useDeleteUser({onSuccess}:DeleteUserProps) {
  const actionLogin = useStore((state) => state.changeDataLogin)
  const navigasi = useNavigate()
  return useMutation({
    mutationFn: DeleteUserFn,
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
