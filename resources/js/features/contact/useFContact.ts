import { axiosInstance } from "@/lib/axios";
import {  TContactScheme } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type table = {id:string} & TContactScheme;
type data = {
  data: table[],
  from: number,
  total: number,
  per_page: number,
}

interface fetchContactProps {
  data: data
  message: string
}

const fetchContact = async (currentPage: number, perpage: number, onSearch: string, token:string) => {
  let url = `/contacts?page=${currentPage}&perpage=${perpage}`;
  if (onSearch) {
    url += `&search=${onSearch}`;
  }
  const { data } = await axiosInstance.get<fetchContactProps>(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

interface FetchContactProps {
  currentPage: number;
  perpage: number;
  onSearch: string;
  onError: (e: AxiosError) => void;
  token:string
}

export function useFetchContact({ currentPage, perpage, onSearch, onError, token }: FetchContactProps) {
  return useQuery(
    {
      queryFn: () => fetchContact(currentPage, perpage, onSearch, token),
      queryKey: ['fetch.contacts', perpage, currentPage],
      onError,
      retry: false
    }
  )
}
