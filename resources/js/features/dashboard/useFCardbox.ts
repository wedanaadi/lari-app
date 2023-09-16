import { axiosInstance } from "@/lib/axios";
import { TDashboardCard } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface fetchCardBoxFnProps {
  data: TDashboardCard,
  message: string
}

const fetchCardBoxFn = async (token:string) => {
  const { data } = await axiosInstance.get<fetchCardBoxFnProps>(`/dashboard`,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

interface FetchCardBoxProps {
  onError: (e: AxiosError) => void;
  token:string
}

export function useFetchCardBox({ onError, token }: FetchCardBoxProps) {
  return useQuery(
    {
      queryFn: () => fetchCardBoxFn(token),
      queryKey: ['fetch.dashboard.cardbox'],
      onError,
      retry: false
    }
  )
}
