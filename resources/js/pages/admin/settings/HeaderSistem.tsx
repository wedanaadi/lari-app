import { ToastNotification } from "@/components/ToastNotification";
import { useFetchHeader } from "@/features/landing";
import { useUpdateHeader } from "@/features/sistem";
import { TSettingHeaderScheme, settingHeaderScheme } from "@/lib/types";
import useStore from "@/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function HeaderSistem() {
  const tokenLogin = useStore((state) => state.token)
  const navigasi = useNavigate()
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSettingHeaderScheme>({
    resolver: zodResolver(settingHeaderScheme),
  });

  const { data: headers, refetch: headersRefetch } = useFetchHeader({
    onError: (err) => {
      if(err.response) {
        if(err.response.status === 401) {
          localStorage.clear()
          navigasi("/login");
          return false
        }
        ToastNotification({
          // message: err.response?err.response?.statusText:'',
          message: 'Gagal load data headers',
          type: 'error'
        })
      }
    },
  })

  useEffect(() => {
    setValue('textWhite', headers?.data.event_name_white ? headers?.data.event_name_white : '')
    setValue('textRed', headers?.data.event_name_red ? headers?.data.event_name_red : '')
    setValue('location', headers?.data.location ? headers?.data.location : '')
    setValue('regency', headers?.data.regency ? headers?.data.regency : '')
    setValue('state', headers?.data.state ? headers?.data.state : '')
    setValue('date', headers?.data.date ? headers?.data.date : '')
    setValue('time', headers?.data.time ? headers?.data.time : '')
  }, [headers,setValue])

  const { mutate: updateHeaders, isSuccess: headersIsSuccess, isLoading:headersIsLoading } = useUpdateHeader({
    onSuccess: () => {
      headersRefetch()
      ToastNotification({
        message: "Update Data Successfuly",
        type: "success",
      });
    },
  })

  const saveData = (data: TSettingHeaderScheme) => {
    const Data = {
      body: data,
      id: 1,
      token:tokenLogin
    }
    console.log(Data);
    updateHeaders(Data)
  }

  return (
    <div
      className={clsx(
        "w-full md:w-8/12",
        "bg-white rounded-t-2xl rounded-b-md shadow-md"
      )}
    >
      <div
        className={clsx(
          "p-4 rounded-t-2xl",
          "flex items-center justify-between border-b-[1px] border-gray-300"
        )}
      >
        <h1 className="sm:text-2xl font-semibold">Setting Header Landing</h1>
      </div>
      <div className="p-4">
        {/* form */}
        <form onSubmit={handleSubmit(saveData)} autoComplete="off">
          <div className="sm:flex sm:justify-between sm:gap-x-4">
            <div className="mb-4 w-full md:w-full">
              <label className="block text-sm leading-6 text-gray-900 font-bold">
                Title Text White
              </label>
              <input
                {...register("textWhite")}
                placeholder="e.g. Bupati Gianyar"
                type="text"
                className={clsx(
                  "block w-full rounded-md border-0 px-2 py-1.5 ",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                )}
              />
              {errors.textWhite && (
                <p className="text-primary text-sm">
                  {errors.textWhite.message}
                </p>
              )}
            </div>

            <div className="mb-4 w-full md:w-full">
              <label className="block text-sm leading-6 text-gray-900 font-bold">
                Title Text Red
              </label>
              <input
                {...register("textRed")}
                placeholder="e.g. Run 2023"
                type="text"
                className={clsx(
                  "block w-full rounded-md border-0 px-2 py-1.5 ",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                )}
              />
              {errors.textRed && (
                <p className="text-primary text-sm">
                  {errors.textRed.message}
                </p>
              )}
            </div>

            <div className="mb-4 w-full md:w-full">
              <label className="block text-sm leading-6 text-gray-900 font-bold">
                Location Event
              </label>
              <input
                {...register("location")}
                placeholder="e.g. Alun-Alun Kota"
                type="text"
                className={clsx(
                  "block w-full rounded-md border-0 px-2 py-1.5 ",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                )}
              />
              {errors.location && (
                <p className="text-primary text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:flex sm:justify-between sm:gap-x-4">
            <div className="mb-4 w-full md:w-full">
              <label className="block text-sm leading-6 text-gray-900 font-bold">
                Regency Event
              </label>
              <input
                {...register("regency")}
                placeholder="e.g. Gianyar, Bali"
                type="text"
                className={clsx(
                  "block w-full rounded-md border-0 px-2 py-1.5 ",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                )}
              />
              {errors.regency && (
                <p className="text-primary text-sm">
                  {errors.regency.message}
                </p>
              )}
            </div>

            <div className="mb-4 w-full md:w-full">
              <label className="block text-sm leading-6 text-gray-900 font-bold">
                State Event
              </label>
              <input
                {...register("state")}
                placeholder="e.g. Indonesia"
                type="text"
                className={clsx(
                  "block w-full rounded-md border-0 px-2 py-1.5 ",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                )}
              />
              {errors.state && (
                <p className="text-primary text-sm">
                  {errors.state.message}
                </p>
              )}
            </div>

            <div className="mb-4 w-full md:w-full">
              <label className="block text-sm leading-6 text-gray-900 font-bold">
                Date Event
              </label>
              <input
                {...register("date")}
                placeholder="e.g. 16 Juli, 2023"
                type="text"
                className={clsx(
                  "block w-full rounded-md border-0 px-2 py-1.5 ",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                )}
              />
              {errors.date && (
                <p className="text-primary text-sm">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div className="mb-4 w-full md:w-full">
              <label className="block text-sm leading-6 text-gray-900 font-bold">
                Time Event
              </label>
              <input
                {...register("time")}
                placeholder="e.g. 06.00 Wita"
                type="text"
                className={clsx(
                  "block w-full rounded-md border-0 px-2 py-1.5 ",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                )}
              />
              {errors.time && (
                <p className="text-primary text-sm">
                  {errors.time.message}
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
            {!headersIsSuccess && headersIsLoading ? (
              <>
                <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="font-medium"> Processing... </span>
              </>
            ) : (
              <span>Simpan</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
