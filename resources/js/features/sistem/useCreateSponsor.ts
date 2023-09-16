import { ToastNotification } from "@/components/ToastNotification"
import { ResetAuthValue } from "@/lib/auth"
import { axiosInstance } from "@/lib/axios"
import { TSettingSponsorScheme } from "@/lib/types"
import useStore from "@/store/useStore"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

interface ICreateSponsorshipFn {
  body: TSettingSponsorScheme,
  token: string
}

const EPCreateSponsor = async (Data: ICreateSponsorshipFn) => {
  const { data } = await axiosInstance.post(`/sponsorship`, Data.body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      Authorization: `Bearer ${Data.token}`
    },
  })
  return data
}

type CreateSponsorshipProps = {
  onSuccess: () => void,
}

export function useCreateSponsorship({onSuccess}:CreateSponsorshipProps) {
  const actionLogin = useStore((state) => state.changeDataLogin)
  const navigasi = useNavigate()
  return useMutation({
    mutationFn: EPCreateSponsor,
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
