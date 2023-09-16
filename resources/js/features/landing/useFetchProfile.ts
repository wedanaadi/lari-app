import { axiosInstance } from "@/lib/axios"
import { TStatusScheme } from "@/lib/types"
import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface fetchProfileProps {
  data: TStatusScheme,
  message: string
}

const fetchProfile = async (noRegistration: string, email: string) => {
  const { data } = await axiosInstance.get<fetchProfileProps>(`/registration/find-status?no=${noRegistration}&email=${email}`)
  return data
}

interface FetchProfileOptions {
  onError: (e: AxiosError) => void;
}

interface ProfileData {
  data: {
    registration_number: string;
    full_name: string;
    status: string;
    email: string;
  }
}

export function useFetchProfile({ onError }: FetchProfileOptions, noRegistration: string, email: string):UseQueryResult<ProfileData, AxiosError> {
  return useQuery(
    {
      queryFn: () => fetchProfile(noRegistration, email),
      queryKey: ['fetch.profile',noRegistration,email],
      onError,
      retry: false
    }
  )
}
