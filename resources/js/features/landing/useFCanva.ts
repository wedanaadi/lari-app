import { axiosInstance } from "@/lib/axios"
import { TCanvaSheme } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface fetchCanvaProps {
  data : TCanvaSheme,
  message: string
}

const fetchCanvaFn = async () => {
  const { data } = await axiosInstance.get<fetchCanvaProps>(`/canva`,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  })
  return data
}

interface FetchCanvaOptions {
  onError: (e: AxiosError) => void;
}

export function useFetchCanva({ onError }: FetchCanvaOptions) {
  return useQuery({
    queryFn: fetchCanvaFn,
    queryKey: ['fetch.canva'],
    onError
  })
}
