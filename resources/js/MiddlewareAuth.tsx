import {useLocation, Navigate} from "react-router-dom"
import useStore from "./store/useStore";
import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

export const RequiredLogin = ({ children }:Props) => {
  const accessToken = useStore((state) => state.token);
  const isLogin = accessToken === null || accessToken === "" ? false : true;
  const location = useLocation()

  return isLogin === false ? <>
  <Navigate to={`/login`} replace state={{ path: location.pathname }} />
  </> : children;
};
