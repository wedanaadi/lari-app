import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type data = {
  data: {
    distance: string,
    price: number,
    name: string
    id: string
  }[],
  from: number,
  total: number,
  per_page: number,
}

interface fetchCategoriesProps {
  data: data
  message: string
}

const fetchCategories = async (
  currentPage: number,
  perpage: number,
  onSearch: string,
  token: string
) => {
  let url = `/categories/admin?page=${currentPage}&perpage=${perpage}`;
  if (onSearch) {
    url += `&search=${onSearch}`;
  }
  const { data } = await axiosInstance.get<fetchCategoriesProps>(url,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

interface FetchCategoryProps {
  currentPage: number,
  perpage: number,
  onSearch: string,
  onError: (e: AxiosError) => void
  token:string
}

export function useFetchCategory({ currentPage, perpage, onSearch, onError, token }: FetchCategoryProps) {
  return useQuery(
    {
      queryFn: () => fetchCategories(currentPage, perpage, onSearch, token),
      queryKey: ['fetch.categories.admin', perpage, currentPage, token],
      onError,
      retry: false
    }
  )
}
