import { ToastNotification } from "@/components/ToastNotification"
import { axiosInstance } from "@/lib/axios"
import { TLoginScheme } from "@/lib/types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

const loginFn = async (body: TLoginScheme) => {
  const { data } = await axiosInstance.post(`/login`, body)
  return data
}

type LoginProps = {
  onSuccess: (response: AxiosResponse) => void,
}

interface ErrorResponse {
  errors: string; // Define the structure of the 'errors' property
}

export function useLogin({onSuccess}:LoginProps) {
  return useMutation({
    mutationFn: loginFn,
    onSuccess,
    onError: (err: AxiosError) => {
      if(err.response) {
        const errorResponse = err.response.data as ErrorResponse; // Cast 'err.response.data' to the defined type
        ToastNotification({
          message: errorResponse.errors,
          type: 'error'
        })
      }
    },
  })
}
