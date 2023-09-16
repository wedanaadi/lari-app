import { ToastNotification } from "@/components/ToastNotification"
import { ResetAuthValue } from "@/lib/auth"
import { axiosInstance } from "@/lib/axios"
import useStore from "@/store/useStore"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

interface FindVerifierFnProps {
  id:number|string
  token: string
}

const findVerifierFn = async (Data: FindVerifierFnProps) => {
  const { data } = await axiosInstance.get(`/registration/find-verifier/${Data.id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${Data.token}`
    }
  })
  return data
}

type FindVerifierProps = {
  onSuccess: (response: AxiosResponse) => void,
}

export function useFindVerifier({onSuccess}:FindVerifierProps) {
  const actionLogin = useStore((state) => state.changeDataLogin)
  const navigasi = useNavigate()
  return useMutation({
    mutationFn: findVerifierFn,
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
