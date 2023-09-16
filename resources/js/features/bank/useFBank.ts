import { axiosInstance } from "@/lib/axios";
import { TBankScheme } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type table = {id:string} & TBankScheme;
type data = {
  data: table[],
  from: number,
  total: number,
  per_page: number,
}

interface fetchBankProps {
  data: data
  message: string
}

const fetchBankFn = async (currentPage: number, perpage: number, onSearch: string, token:string) => {
  let url = `/banks?page=${currentPage}&perpage=${perpage}`;
  if (onSearch) {
    url += `&search=${onSearch}`;
  }
  const { data } = await axiosInstance.get<fetchBankProps>(url,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

interface FetchBankProps {
  currentPage: number;
  perpage: number;
  onSearch: string;
  onError: (e: AxiosError) => void;
  token:string
}

export function useFetchBank({ currentPage, perpage, onSearch, onError, token }: FetchBankProps) {
  return useQuery(
    {
      queryFn: () => fetchBankFn(currentPage, perpage, onSearch, token),
      queryKey: ['fetch.banks', perpage, currentPage],
      onError,
      retry: false
    }
  )
}
