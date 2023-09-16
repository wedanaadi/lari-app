import { ToastNotification } from "@/components/ToastNotification";
import { ResetAuthValue } from "@/lib/auth";
import { axiosInstance } from "@/lib/axios"
import { TItemId } from "@/lib/types"
import useStore from "@/store/useStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface UpdateVerificationFnProps {
  body: {
    user_id: string;
  };
  id: TItemId;
  token:string
}
const updateVerificationFn = async (Data: UpdateVerificationFnProps) => {
  const { data } = await axiosInstance.put(`/registration/verifikasi/${Data.id}`, Data.body, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${Data.token}`
    }
  })
  return data
}

type UpdateVerificationProps = {
  onSuccess: (response: AxiosResponse) => void,
}

export function useUpdateVerification({onSuccess}:UpdateVerificationProps) {
  const actionLogin = useStore((state) => state.changeDataLogin)
  const navigasi = useNavigate()
  return useMutation({
    mutationFn: updateVerificationFn,
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
