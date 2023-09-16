import { ToastNotification } from '@/components/ToastNotification';
import { useCreateSponsorship } from '@/features/sistem';
import { TSettingSponsorScheme, settingSponsorScheme } from '@/lib/types';
import useStore from '@/store/useStore';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { IoIosArrowDropleft } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

export default function AddSponsorship() {
  const tokenLogin = useStore((state) => state.token)
  const navigasi = useNavigate();
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSettingSponsorScheme>({
    resolver: zodResolver(settingSponsorScheme),
  });

  const { mutate: createSponsorship, isSuccess:sponsorshipIsSuccess } = useCreateSponsorship({
    onSuccess: () => {
      ToastNotification({
        message: "Sponsorship created Successfuly",
        type: "success",
      });
      setTimeout(() => {
        navigasi('/admin/settings/sponsorship')
        reset();
      }, 1200);
    },
  });

  const saveData = (data: TSettingSponsorScheme) => {
    const dataBody = {
      body: data,
      token: tokenLogin
    };
    createSponsorship(dataBody)
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
        <h1 className="sm:text-2xl font-semibold">Add Sponsorship Landing</h1>
        <Link to={'/admin/settings/sponsorship'} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded flex items-center">
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
                Title
              </label>
              <input
                type="text"
                placeholder="e.g. Tokopedia"
                {...register("title")}
                className={clsx(
                  "block w-full rounded-md border-0 px-2 py-1.5 ",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                )}
              />
              {errors.title && (
                <p className="text-primary text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="mb-4 w-full md:w-full">
              <label className="block text-sm leading-6 text-gray-900 font-bold">
                Image
              </label>
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <input
                    type="file"
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                    }}
                    accept="image/*"
                  />
                )}
              />
              {errors.image && (
                <p className="text-primary text-sm">
                  {errors.image.message}
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
            {sponsorshipIsSuccess ? (
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
