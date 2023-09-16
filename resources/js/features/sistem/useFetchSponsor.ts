import { axiosInstance } from "@/lib/axios";
import { TThemeSponsorship } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type data = {
  data: TThemeSponsorship[],
  from: number,
  total: number,
  per_page: number,
}

interface fetchSponsorshipProps {
  data: data
  message: string
}

const fetchSponsorship = async (currentPage: number, perpage: number, onSearch: string, token:string) => {
  let url = `/sponsorship/admin?page=${currentPage}&perpage=${perpage}`;
  if (onSearch) {
    url += `&search=${onSearch}`;
  }
  const { data } = await axiosInstance.get<fetchSponsorshipProps>(url,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

interface UseFetchSponsorshipProps {
  currentPage: number,
  perpage: number,
  onSearch: string,
  onError: (e: AxiosError) => void
  token: string
}

export function useFetchSponsor({ currentPage, perpage, onSearch, onError, token }: UseFetchSponsorshipProps) {
  return useQuery(
    {
      queryFn: () => fetchSponsorship(currentPage, perpage, onSearch, token),
      queryKey: ['fetch.sponsorship.admin', perpage, currentPage],
      onError,
      retry: false
    }
  )
}
