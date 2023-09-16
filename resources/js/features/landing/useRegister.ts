import { ToastNotification } from "@/components/ToastNotification";
import { axiosInstance } from "@/lib/axios";
import { TRegisterSchema } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const Registration = async (body: TRegisterSchema) => {
  const { data } = await axiosInstance.post(`/registration`, body)
  return data
}

type useRegisterProps = {
  onSuccess: (response: AxiosResponse) => void,
}

export function useRegister({ onSuccess}:useRegisterProps) {
  return useMutation({
    mutationFn: Registration,
    onSuccess,
    onError: (err: AxiosError) => {
      if(err.response) {
        ToastNotification({
          message: err.response.statusText,
          type: 'error'
        })
      }
    },
  })
}
