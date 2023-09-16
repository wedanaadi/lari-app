import { dencriptData } from "@/components/encrypt";
import { TUserScheme } from "@/lib/types";
import { SetStateAction } from "react";

type UseLogin = {
  id: string,
  role: string
  status: string
} & TUserScheme

export interface AuthSlice {
  dataLogin: UseLogin;
  token: string;
  changeDataLogin: (data: {
    accessToken: string;
    user_data: UseLogin
  }) => void;
}

const tokenStore = localStorage.getItem("access_token");

const createAuthSlice = (set: React.Dispatch<SetStateAction<AuthSlice>>):AuthSlice => ({
  dataLogin: tokenStore === null ? [] : JSON.parse(dencriptData(localStorage.getItem("data_login") ?? "")),
  token: tokenStore === null ? "" : dencriptData(tokenStore),
  changeDataLogin: async (data) => {
    set((prevState) => ({
      ...prevState,
      token: data.accessToken,
      dataLogin: data.user_data
    }));
  },
});

export default createAuthSlice;
