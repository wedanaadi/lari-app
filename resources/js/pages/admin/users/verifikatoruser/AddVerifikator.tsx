import { ToastNotification } from "@/components/ToastNotification";
import { useCreateUser } from "@/features/user";
import { TUserScheme, UserSceme } from "@/lib/types";
import useStore from "@/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { IoIosArrowDropleft } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function AddVerifikator() {
  const tokenLogin = useStore((state) => state.token)
  const navigasi = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserScheme>({
    resolver: zodResolver(UserSceme),
  });

  const { mutate: createVerifikatorUser } = useCreateUser({
    onSuccess: () => {
      ToastNotification({
        message: "User verifikator created Successfuly",
        type: "success",
      });
      setTimeout(() => {
        navigasi('/admin/users/verifikator')
        reset();
      }, 1200);
    },
  });

  const saveData = (data: TUserScheme) => {
    const dataNew = {
      role:'verifikator',
      username: data.username,
      password: data.password,
      name: data.name,
      phone: data.phone
    }
    const dataBody = {
      body: dataNew,
      token: tokenLogin
    };
    createVerifikatorUser(dataBody)
  }
  return (
    <div
      className={clsx(
        "w-full md:w-8/12",
        "bg-white rounded-t-2xl rounded-b-md shadow-md"
      )}
    >
      <div className={clsx(
        "p-4 rounded-t-2xl",
        "flex items-center justify-between border-b-[1px] border-gray-300"
      )}
      >
        <h1 className="sm:text-2xl font-semibold">Add Verifikator</h1>
        <Link to={'/admin/users/verifikator'} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded flex items-center">
          <IoIosArrowDropleft /> &nbsp;
          <span>Kembali</span>
        </Link>
      </div>
      <div className="p-4">
        {/* form */}
        <form encType='multipart/form-data' onSubmit={handleSubmit(saveData)} autoComplete="off">
          <div className="sm:flex sm:justify-between sm:gap-x-4">
            <div className="mb-4 w-full md:w-full">
              <label className="block text-sm leading-6 text-gray-900 font-bold">
                Username
              </label>
              <input
                type="text"
                placeholder="e.g. adminuser"
                {...register("username")}
                className={clsx(
                  "block w-full rounded-md border-0 px-2 py-1.5 ",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                )}
              />
              {errors.username && (
                <p className="text-primary text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="mb-4 w-full md:w-full">
              <label className="block text-sm leading-6 text-gray-900 font-bold">
                Password
              </label>
              <input
                type="password"
                placeholder="e.g. ******"
                {...register("password")}
                className={clsx(
                  "block w-full rounded-md border-0 px-2 py-1.5 ",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                )}
              />
              {errors.password && (
                <p className="text-primary text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:flex sm:justify-between sm:gap-x-4">
            <div className="mb-4 w-full md:w-full">
              <label className="block text-sm leading-6 text-gray-900 font-bold">
                Nama
              </label>
              <input
                type="text"
                placeholder="e.g. Andi Putra"
                {...register("name")}
                className={clsx(
                  "block w-full rounded-md border-0 px-2 py-1.5 ",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                )}
              />
              {errors.name && (
                <p className="text-primary text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4 w-full md:w-full">
              <label className="block text-sm leading-6 text-gray-900 font-bold">
                Phone
              </label>
              <input
                type="text"
                placeholder="e.g. 098678678"
                {...register("phone")}
                className={clsx(
                  "block w-full rounded-md border-0 px-2 py-1.5 ",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                )}
              />
              {errors.phone && (
                <p className="text-primary text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={clsx(
              "w-full mt-8 px-3 py-2 rounded-md",
              "inline-flex justify-center",
              "font-semibold text-white",
              "shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              "bg-primary hover:bg-secondary"
            )}
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  )
}
