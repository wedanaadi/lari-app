import { ToastNotification } from "@/components/ToastNotification"
import { ResetAuthValue } from "@/lib/auth"
import { axiosInstance } from "@/lib/axios"
import { TSSponsorSchemeEdit } from "@/lib/types"
import useStore from "@/store/useStore"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

interface dataSponsorshipProps {
  body: TSSponsorSchemeEdit,
  id:number
  token: string
}
const UpdateSponsorship = async (Data: dataSponsorshipProps) => {
  const { data } = await axiosInstance.post(`/sponsorship/${Data.id}`, Data.body,{
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      Authorization: `Bearer ${Data.token}`
    }})
  return data
}

type UpdateSponsorshipProps = {
  onSuccess: () => void,
}

export function useUpdateSponsorship({onSuccess}:UpdateSponsorshipProps) {
  const actionLogin = useStore((state) => state.changeDataLogin)
  const navigasi = useNavigate()
  return useMutation({
    mutationFn: UpdateSponsorship,
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
