import { ToastNotification } from "@/components/ToastNotification";
import { useFetchCanva } from "@/features/landing";
import { useUpdateCanva } from "@/features/sistem";
import { TCanvaSheme, canvaScheme } from "@/lib/types";
import useStore from "@/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Canva() {
  const tokenLogin = useStore((state) => state.token)
  const navigasi = useNavigate()
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCanvaSheme>({
    resolver: zodResolver(canvaScheme),
  });

  const { data: canva, refetch: canvaRefetch } = useFetchCanva({
    onError: (err) => {
      if (err.response) {
        if (err.response.status === 401) {
          localStorage.clear()
          navigasi("/login");
          return false
        }
        ToastNotification({
          // message: err.response?err.response?.statusText:'',
          message: 'Gagal load data canva',
          type: 'error'
        })
      }
    },
  })

  useEffect(() => {
    setValue('canva_inframe', canva?.data.canva_inframe ? canva?.data.canva_inframe : '')
  }, [canva, setValue])

  const { mutate: updateCanva, isSuccess: canvaIsSuccess, isLoading: canvaIsLoading } = useUpdateCanva({
    onSuccess: () => {
      canvaRefetch()
      ToastNotification({
        message: "Update Data Successfuly",
        type: "success",
      });
    },
  })

  const saveData = (data: TCanvaSheme) => {
    const Data = {
      body: data,
      id: 1,
      token:tokenLogin
    }
    updateCanva(Data)
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
          <div className="mb-4 w-full md:w-full">
            <label className="block text-sm leading-6 text-gray-900 font-bold">
              Inframe
            </label>
            <textarea
              rows={10}
              {...register("canva_inframe")}
              placeholder="e.g. Tag Inframe"
              className={clsx(
                "block w-full rounded-md border-0 px-2 py-1.5 ",
                "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
              )}
            />
            {errors.canva_inframe && (
              <p className="text-primary text-sm">
                {errors.canva_inframe.message}
              </p>
            )}
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
            {!canvaIsSuccess && canvaIsLoading ? (
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
  )
}
