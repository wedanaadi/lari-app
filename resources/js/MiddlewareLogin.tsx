import {useLocation, Navigate} from "react-router-dom"
import useStore from "./store/useStore";
import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

export const RequiredNotLogin = ({ children }:Props) => {
  const accessToken = useStore((state) => state.token);
  const isLogin = accessToken === null || accessToken === "" ? false : true;
  const location = useLocation()

  return isLogin === true ? <>
  <Navigate to={`/admin`} replace state={{ path: location.pathname }} />
  </> : children;
};
