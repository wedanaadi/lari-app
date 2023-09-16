import { ToastNotification } from "@/components/ToastNotification";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const ExportFn = async (id: string) => {
  const { data } = await axiosInstance.get(`/export/${id}`)
  return data
}

type ExportProps = {
  onSuccess: (response: AxiosResponse) => void,
}

export function useExport({onSuccess}:ExportProps) {
  return useMutation({
    mutationFn: ExportFn,
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
