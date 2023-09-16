import { axiosInstance } from "@/lib/axios";
import { TRegistration } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type data = {
  data: TRegistration[],
  from: number,
  total: number,
  per_page: number,
}

interface fetchRegistrationProps {
  data: data
  message: string
}

const fetchRegistration = async (currentPage: number, perpage: number, onSearch: string, token:string) => {
  let url = `/registration?page=${currentPage}&perpage=${perpage}`;
  if (onSearch) {
    url += `&search=${onSearch}`;
  }
  const { data } = await axiosInstance.get<fetchRegistrationProps>(url,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

interface FRegistrationListProps {
  currentPage: number,
  perpage: number,
  onSearch: string,
  onError: (e: AxiosError) => void
  token:string
}

export const useFRegistrationList = ({ currentPage, perpage, onSearch, onError, token }: FRegistrationListProps) => {
  return useQuery(
    {
      queryFn: () => fetchRegistration(currentPage, perpage, onSearch, token),
      queryKey: ['fetch.register.admin', perpage, currentPage],
      onError,
      retry: false
    }
  )
};
