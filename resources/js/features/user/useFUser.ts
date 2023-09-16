import { axiosInstance } from "@/lib/axios";
import {  TUserScheme } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type table = {id:string} & TUserScheme;
type data = {
  data: table[],
  from: number,
  total: number,
  per_page: number,
}

interface fetchUserProps {
  data: data
  message: string
}

const fetchUser = async (currentPage: number, perpage: number, onSearch: string, aksi:string, token:string) => {
  let url = `/users?page=${currentPage}&perpage=${perpage}&aksi=${aksi}`;
  if (onSearch) {
    url += `&search=${onSearch}`;
  }
  const { data } = await axiosInstance.get<fetchUserProps>(url,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

interface FetchUserProps {
  aksi: string;
  currentPage: number;
  perpage: number;
  onSearch: string;
  onError: (e: AxiosError) => void;
  token:string
}

export function useFetchUser({ currentPage, perpage, onSearch, onError, aksi, token }: FetchUserProps) {
  return useQuery(
    {
      queryFn: () => fetchUser(currentPage, perpage, onSearch, aksi, token),
      queryKey: ['fetch.users', perpage, currentPage],
      onError,
      retry: false
    }
  )
}
