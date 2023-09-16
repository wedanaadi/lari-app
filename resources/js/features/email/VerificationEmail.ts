import { ToastNotification } from "@/components/ToastNotification";
import { axiosInstance } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type TEmailVerifikasi = {
  email: string;
  kategori: string;
  lokasi: string;
  waktu: string;
  nama: string;
  registration_number: string;
  tanggal_acara: string;
  subject: string;
  link: string;
}

const sendEmail = async (body: TEmailVerifikasi) => {
  const { data } = await axiosInstance.post(`/email/verification`, body)
  return data
}

type EmailVerificationProps = {
  onSuccess: () => void,
}

export function useEmailVerification({onSuccess}:EmailVerificationProps) {
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
