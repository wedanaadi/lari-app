import { ToastNotification } from "@/components/ToastNotification"
import { ResetAuthValue } from "@/lib/auth"
import { axiosInstance } from "@/lib/axios"
import { TItemId } from "@/lib/types"
import useStore from "@/store/useStore"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

interface IDeleteSponsorshipFn {
  id: TItemId,
  token: string
}


const DeleteSponsorshipFn = async (Data: IDeleteSponsorshipFn) => {
  const { data } = await axiosInstance.delete(`/sponsorship/${Data.id}`,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${Data.token}`
    }
  })
  return data
}

type DeleteSponsorshipProps = {
  onSuccess: () => void,
}

export function useDeleteSponsorship({onSuccess}:DeleteSponsorshipProps) {
  const actionLogin = useStore((state) => state.changeDataLogin)
  const navigasi = useNavigate()
  return useMutation({
    mutationFn: DeleteSponsorshipFn,
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
