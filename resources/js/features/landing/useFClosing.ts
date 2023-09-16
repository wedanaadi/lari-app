import { axiosInstance } from "@/lib/axios"
import { TItemId } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

interface fetchClosingProps {
  data : {
    id:TItemId,
    keterangan:string,
    value: string
  },
  value: string
  message: string
}

const fetchClosingFn = async () => {
  const { data } = await axiosInstance.get<fetchClosingProps>(`/closing`)
  return data
}

interface FetchClosingOptions {
  onError: () => void;
}

export function useFetchClosing({ onError }: FetchClosingOptions) {
  return useQuery({
    // refetchOnWindowFocus:true,
    queryFn: fetchClosingFn,
    queryKey: ['fetch.closing.date'],
    onError
  })
}
