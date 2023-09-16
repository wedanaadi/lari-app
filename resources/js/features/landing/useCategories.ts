import { axiosInstance } from "@/lib/axios"
import { TThemeCategories } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

interface fetchCategoriesProps {
  data : TThemeCategories[],
  message: string
}

const fetchCategories = async () => {
  const { data } = await axiosInstance.get<fetchCategoriesProps>(`/categories`)
  return data
}

interface FetchCategoriesOptions {
  onError: () => void;
}

export function useFetchCategories({ onError }: FetchCategoriesOptions) {
  return useQuery({
    // refetchOnWindowFocus: true,
    queryFn: fetchCategories,
    queryKey: ['fetch.Categories'],
    onError
  })
}
