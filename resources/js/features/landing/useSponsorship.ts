import { axiosInstance } from "@/lib/axios"
import { TThemeSponsorship } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

interface fetchSponsorshipProps {
  data : TThemeSponsorship[],
  message: string
}

const fetchSponsorship = async () => {
  const { data } = await axiosInstance.get<fetchSponsorshipProps>(`/sponsorship`)
  return data
}

interface FetchSponsorshipOptions {
  onError: () => void;
}

export function useFetchSponsorship({ onError }: FetchSponsorshipOptions) {
  return useQuery({
    // refetchOnWindowFocus: true,
    queryFn: fetchSponsorship,
    queryKey: ['fetch.sponsorships'],
    onError
  })
}
