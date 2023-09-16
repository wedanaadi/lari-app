import { axiosInstance } from "@/lib/axios"
import { TThemeHeader } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface fetchHeaderProps {
  data : TThemeHeader,
  message: string
}

const fetchHeader = async () => {
  const { data } = await axiosInstance.get<fetchHeaderProps>(`/headers`)
  return data
}

interface FetchHeaderOptions {
  onError: (e: AxiosError) => void;
}

export function useFetchHeader({ onError }: FetchHeaderOptions) {
  return useQuery({
    // refetchOnWindowFocus:true,
    queryFn: fetchHeader,
    queryKey: ['fetch.headers'],
    onError
  })
}
