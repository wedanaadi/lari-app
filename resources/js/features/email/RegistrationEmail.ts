import { ToastNotification } from "@/components/ToastNotification";
import { axiosInstance } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type TEmailRegister = {
  email: string;
  kategori: string;
  lokasi: string;
  waktu: string;
  nama: string;
  price: string|number;
  registration_number: string;
  tanggal_acara: string;
  subject: string;
}

const sendEmail = async (body: TEmailRegister) => {
  const { data } = await axiosInstance.post(`/email/registration`, body)
  return data
}

type EmailRegistrationProps = {
  onSuccess: () => void,
}

export function useEmailRegistration({onSuccess}:EmailRegistrationProps) {
  return useMutation({
    mutationFn: sendEmail,
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
