import { ToastNotification } from "@/components/ToastNotification"
import { ResetAuthValue } from "@/lib/auth"
import { axiosInstance } from "@/lib/axios"
import { TSettingHeaderScheme } from "@/lib/types"
import useStore from "@/store/useStore"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

interface FetchHeaderProps {
  body: TSettingHeaderScheme,
  id:number
  token:string
}
const UpdateHeader = async (Data: FetchHeaderProps) => {
  const { data } = await axiosInstance.put(`/headers/${Data.id}`, Data.body,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${Data.token}`
    }
  })
  return data
}

type UpdateHeaderProps = {
  onSuccess: () => void,
}

export function useUpdateHeader({onSuccess}:UpdateHeaderProps) {
  const actionLogin = useStore((state) => state.changeDataLogin)
  const navigasi = useNavigate()
  return useMutation({
    mutationFn: UpdateHeader,
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
