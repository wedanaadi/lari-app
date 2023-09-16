import baseUrl from "@/lib/baseUrl";
import { TStatusScheme, statusScheme } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// import { useState } from "react";
const MyStatus = () => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TStatusScheme>({ resolver: zodResolver(statusScheme) });

  const ViewStatus = (data: TStatusScheme) => {
    const link = `${baseUrl}/status-registration/user/${data.email}/${data.noRegistration}`;
    window.open(link);
    reset();
  };

  return (
    <>
      <hr className="border-b-2 block sm:hidden border-dashed border-secondary" />
      <div className="bg-white">
        <div className="p-24 flex flex-col w-full justify-center">
          <h1 className="mb-4 text-xl font-bold md:text-2xl text-center text-black">
            Please enter your <span className="text-primary">Runner ID</span>{" "}
            and <span className="text-primary">Email</span> in the box below
          </h1>
          <div className="mt-2 w-full sm:w-3/4 mx-auto">
            <form onSubmit={handleSubmit(ViewStatus)} autoComplete="off">
              <div className="mb-6">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                  placeholder={"e.g. RGS23xxxxxxx"}
                  aria-describedby="runner-id"
                  {...register("noRegistration")}
                />
                {errors.noRegistration && (
                  <p className="text-primary text-sm">
                    {errors.noRegistration.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                  placeholder="e.g. john@doe.com"
                  aria-describedby="runner-email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-primary text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="mt-2 flex items-center gap-x-6">
                <button className="w-full rounded-md bg-primary px-3.5 py-2.5 text-sm text-center font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyStatus;
