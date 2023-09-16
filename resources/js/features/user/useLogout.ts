import { ToastNotification } from "@/components/ToastNotification"
import { axiosInstance } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

const logoutFn = async (token: string) => {
  const { data } = await axiosInstance.post(`/logout`, {}, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept:'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

type LogoutProps = {
  onSuccess: () => void,
}

export function useLogout({ onSuccess }: LogoutProps) {
  const navigasi = useNavigate()
  return useMutation({
    mutationFn: logoutFn,
    onSuccess,
    onError: (err: AxiosError) => {
      if (err.response) {
        if(err.response.status === 401) {
          localStorage.clear()
          navigasi("/login");
          return false
        }
        ToastNotification({
          message: err.response.statusText,
          type: 'error'
        })
      }
    },
  })
}
