import { axiosInstance } from "@/lib/axios";
import { TOtherSettingScheme } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type table = {id:string} & TOtherSettingScheme;
type data = {
  data: table[],
  from: number,
  total: number,
  per_page: number,
}

interface fetchOtherSettingProps {
  data: data
  message: string
}

const fetchOtherSettingFn = async (currentPage: number, perpage: number, onSearch: string, token:string) => {
  let url = `/othersettings?page=${currentPage}&perpage=${perpage}`;
  if (onSearch) {
    url += `&search=${onSearch}`;
  }
  const { data } = await axiosInstance.get<fetchOtherSettingProps>(url,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

interface FetchOtherSettingProps {
  currentPage: number;
  perpage: number;
  onSearch: string;
  onError: (e: AxiosError) => void;
  token: string
}

export function useFetchOtherSetting({ currentPage, perpage, onSearch, onError, token }: FetchOtherSettingProps) {
  return useQuery(
    {
      queryFn: () => fetchOtherSettingFn(currentPage, perpage, onSearch, token),
      queryKey: ['fetch.contacts', perpage, currentPage],
      onError,
      retry: false
    }
  )
}
