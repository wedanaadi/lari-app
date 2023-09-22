import { ToastNotification } from "@/components/ToastNotification";
import { encriptData } from "@/components/encrypt";
import { useLogin } from "@/features/user";
import { baseLogo } from "@/lib/baseUrl";
import { TLoginScheme, loginSceme } from "@/lib/types";
import useStore from "@/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login(): JSX.Element {
  const navigasi = useNavigate();
  const actionLogin = useStore((state) => state.changeDataLogin)

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginScheme>({
    resolver: zodResolver(loginSceme),
  });

  const { mutate: login, isLoading: loginIsLoading } = useLogin({
    onSuccess: (response) => {
      actionLogin({
        accessToken: response.data.access_token,
        user_data: response.data.user_data
      })
      localStorage.setItem(
        "access_token",
        encriptData(response?.data?.access_token)
      );
      localStorage.setItem(
        "data_login",
        encriptData(JSON.stringify(response?.data?.user_data))
      );
      ToastNotification({
        message: "Login Successfuly",
        type: "success",
      });
      setTimeout(() => {
        navigasi('/admin')
        reset();
      }, 1200);
    },
  });

  const loginAksi = (data: TLoginScheme) => {
    login(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-1/3">
        <div className="mb-4 text-center">
          {/* Logo Anda bisa diletakkan di sini */}
          <img src={baseLogo} alt="Logo" className="mx-auto h-12 w-auto border-b-2 border-black" />
          <h2 className="mt-2 text-2xl font-semibold">Login</h2>
        </div>
        <form onSubmit={handleSubmit(loginAksi)} autoComplete="off">
          {/* Form login Anda bisa diletakkan di sini */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm mb-2">Username</label>
            <input type="text" id="username" {...register("username")} className={clsx(
              "block w-full rounded-md border-0 px-2 py-1.5 ",
              "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
              "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
            )} />
            {errors.username && (
              <p className="text-primary text-sm">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm mb-2">Password</label>
            <input type="password" id="password" {...register("password")} className={clsx(
              "block w-full rounded-md border-0 px-2 py-1.5 ",
              "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
              "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
            )} />
            {errors.password && (
              <p className="text-primary text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-primary text-white p-2 rounded hover:bg-secondary">
              {loginIsLoading ? (
                <div className="flex justify-center">
                  <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="font-medium"> Processing... </span>
                </div>
              ) : (
                <span>Login</span>
              )}
            </button>
          </div>
          <div className="mb-4 w-full">
          </div>
          <span>
            <NavLink to={'/'} className="text-primary">Halaman Depan</NavLink>
          </span>
        </form>
      </div>
    </div>

  )
}
