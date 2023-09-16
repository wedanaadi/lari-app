import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Combobox from "react-tailwindcss-select";
import Datepicker from "react-tailwindcss-datepicker";
import { FC, useEffect, useState } from "react";
import {
  TDateValue,
  TRegisterSchema,
  TSelectValue,
  TThemeCategories,
  registerSchema,
} from "@/lib/types";
import { clsx } from "clsx";
import { useFetchClosing, useRegister } from "@/features/landing";
import { ToastNotification } from "@/components/ToastNotification";
import { useEmailRegistration } from "@/features/email";
import { ToDate, checkTutup } from "@/components/date";
import { formatNumber } from "@/components/NumberThousand";

interface RegisterFormProps {
  categories: TThemeCategories[];
}

const RegisterForm: FC<RegisterFormProps> = ({ categories }) => {
  const {
    setValue,
    reset,
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) });

  const [closeRegis, setCloseRegis] = useState(false);
  const [gender] = useState<TSelectValue>();
  const [category] = useState<TSelectValue>();
  const [bloodType] = useState<TSelectValue>();
  const [sizeJersey] = useState<TSelectValue>();
  const [birthOfDay, setBirthOfDay] = useState<TDateValue>({
    startDate: null,
    endDate: null,
  });

  const optionsJK = [
    { value: "Laki-Laki", label: "👨 Laki-Laki" },
    { value: "Perempuan", label: "👧 Perempuan" },
  ];

  const [optionsCategory, setOptionsCategory] = useState<
    Array<{ value: string; label: string }>
  >([]);

  useEffect(() => {
    // Buat salinan array yang baru dengan menggunakan map
    const newOptionsCategory = categories.map((c) => ({
      value: c.id,
      label: `${c.name} | ${c.distance} | ${formatNumber(Number(c.price))}`,
    }));

    // Perbarui state optionsCategory dengan array baru
    setOptionsCategory(newOptionsCategory);

    if (categories.length === 1) {
      setValue("categories", newOptionsCategory[0]);
    }
  }, [categories, setValue]);
  // const optionsCategory = categories

  const optionsUkuran = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];

  const optionsGol = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "AB", label: "AB" },
    { value: "O", label: "O" },
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "Tidak Mengetahui", label: "Tidak Mengetahui" },
  ];

  const { mutate: sendEmail } = useEmailRegistration({
    onSuccess: () => { console.log('send email') }
  })

  const { mutate: createRegister, isLoading: registrationLoading } = useRegister({
    onSuccess: (response) => {
      sendEmail(response.data)
      reset();
      setBirthOfDay({
        startDate: new Date(),
        endDate: new Date(),
      })
      ToastNotification({
        message: "Registration Successfuly",
        type: "success",
      });
    },
  });

  const saveData = (data: TRegisterSchema) => {
    // console.log("work", JSON.stringify(data));
    createRegister(data);
  };

  const { data: closingDate, isSuccess: closingDateSuccess } = useFetchClosing({
    onError: () => { }
  })


  useEffect(() => {
    if (closingDateSuccess) {
      setCloseRegis(checkTutup(new Date(`${closingDate.value} 23:59:50`)))
    }
  }, [closingDate, closingDateSuccess])

  return (
    <div className="bg-white">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              // className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
              className={clsx(
                "absolute inset-y-0 right-8 hidden h-full w-80",
                "translate-x-1/2 transform fill-white lg:block"
              )}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>
            <div
              className="relative px-6 py-6 sm:py-6 lg:px-8 lg:py-6 lg:pr-0"
              id="FormDaftar"
            >
              <h1 className="text-black font-bold text-xl mb-4">
                REGISTRASI
                <span className="text-sm text-red-600 font-semibold ml-1">
                  * Pendaftaran ditutup pada{" "}
                  {ToDate(new Date(`${closingDate?.value} 23:59:50`))}
                </span>
              </h1>
              <form
                onSubmit={handleSubmit(saveData)}
                autoComplete="off"
                className="w-full lg:w-4/5"
              >
                <div className="mb-4 w-full md:w-full">
                  <label className="block text-sm leading-6 text-gray-900 font-bold">
                    Nama Lengkap
                  </label>
                  <input
                    {...register("fullName")}
                    placeholder="e.g. Jhon Doe"
                    type="text"
                    className={clsx(
                      "block w-full rounded-md border-0 px-2 py-1.5 ",
                      "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                      "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                    )}
                  />
                  {errors.fullName && (
                    <p className="text-primary text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="sm:flex sm:justify-between sm:gap-x-4">
                  <div className="mb-4 w-full md:w-7/12">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Kategori
                    </label>
                    <Controller
                      name="categories"
                      control={control}
                      defaultValue={category}
                      render={({ field }) => (
                        <Combobox
                          isDisabled={
                            optionsCategory.length === 1 ? true : false
                          }
                          value={field.value}
                          onChange={field.onChange}
                          options={optionsCategory}
                          primaryColor="red"
                        />
                      )}
                    />
                    {errors.categories && (
                      <p className="text-primary text-sm">
                        {errors.categories.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 w-full md:w-5/12">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Nama BiB
                    </label>
                    <input
                      {...register("nameBiB")}
                      placeholder="e.g. Jhon"
                      type="text"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                    />
                    {errors.nameBiB && (
                      <p className="text-primary text-sm">
                        {errors.nameBiB.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:flex sm:justify-between sm:gap-x-4">
                  <div className="mb-4 w-full">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Nomor Indentitas
                    </label>
                    <input
                      {...register("identityNumber")}
                      placeholder="e.g. NIK/KITAS/Kartu pelajar"
                      type="text"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                    />
                    {errors.identityNumber && (
                      <p className="text-primary text-sm">
                        {errors.identityNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Tanggal Lahir
                    </label>
                    <Controller
                      name="birthDate"
                      control={control}
                      defaultValue={birthOfDay}
                      render={({ field }) => (
                        <Datepicker
                          maxDate={new Date()}
                          primaryColor="red"
                          useRange={false}
                          asSingle={true}
                          value={field.value}
                          onChange={field.onChange}
                          inputClassName={`w-full relative rounded-md font-normal p-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none bg-four rounded-md`}
                        />
                      )}
                    />
                    {errors.birthDate && (
                      <p className="text-primary text-sm">
                        {errors.birthDate.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:flex sm:justify-between sm:gap-x-4">
                  <div className="mb-4 w-full">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Jenis Kelamin
                    </label>
                    <Controller
                      name="gender"
                      control={control}
                      defaultValue={gender}
                      render={({ field }) => (
                        <Combobox
                          value={field.value}
                          onChange={field.onChange}
                          options={optionsJK}
                          primaryColor="red"
                          isSearchable
                        />
                      )}
                    />
                    {errors.gender && (
                      <p className="text-primary text-sm">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Golongan Darah
                    </label>
                    <Controller
                      name="bloodType"
                      control={control}
                      defaultValue={bloodType}
                      render={({ field }) => (
                        <Combobox
                          value={field.value}
                          onChange={field.onChange}
                          options={optionsGol}
                          primaryColor="red"
                          isSearchable
                        />
                      )}
                    />
                    {errors.bloodType && (
                      <p className="text-primary text-sm">
                        {errors.bloodType.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:flex sm:justify-between sm:gap-x-4">
                  <div className="mb-4 w-full">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Size Jersey
                    </label>
                    <Controller
                      name="sizeJersey"
                      control={control}
                      defaultValue={sizeJersey}
                      render={({ field }) => (
                        <Combobox
                          value={field.value}
                          onChange={field.onChange}
                          options={optionsUkuran}
                          primaryColor="red"
                          isSearchable
                        />
                      )}
                    />
                    {errors.sizeJersey && (
                      <p className="text-primary text-sm">
                        {errors.sizeJersey.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Nomor HP
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="e.g. 088476364"
                      type="text"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                    />
                    {errors.phone && (
                      <p className="text-primary text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:flex sm:justify-between sm:gap-x-4">
                  <div className="mb-4 w-full">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Nama Kontak Darurat
                    </label>
                    <input
                      {...register("emergencyContactName")}
                      placeholder="e.g. Leanne Graham"
                      type="text"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                    />
                    {errors.emergencyContactName && (
                      <p className="text-primary text-sm">
                        {errors.emergencyContactName.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Nomor Kontak Darurat
                    </label>
                    <input
                      {...register("emergencyContactPhone")}
                      placeholder="e.g. 087434377"
                      type="text"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                    />
                    {errors.emergencyContactPhone && (
                      <p className="text-primary text-sm">
                        {errors.emergencyContactPhone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:flex sm:justify-between sm:gap-x-4">
                  <div className="mb-4 w-full">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Kota
                    </label>
                    <input
                      {...register("city")}
                      placeholder="e.g. Denpasar"
                      type="text"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                    />
                    {errors.city && (
                      <p className="text-primary text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Kewarganegaraan
                    </label>
                    <input
                      {...register("national")}
                      placeholder="e.g. Indonesia"
                      type="text"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                    />
                    {errors.national && (
                      <p className="text-primary text-sm">
                        {errors.national.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:flex sm:justify-between sm:gap-x-4">
                  <div className="mb-4 w-full">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      placeholder="e.g. jhon.doe@mail.com"
                      type="email"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                    />
                    {errors.email && (
                      <p className="text-primary text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                      Vaksin Covid
                    </label>
                    <input
                      {...register("covidVaccine")}
                      placeholder="e.g. Booster Pertama"
                      type="text"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
                    />
                    {errors.covidVaccine && (
                      <p className="text-primary text-sm">
                        {errors.covidVaccine.message}
                      </p>
                    )}
                  </div>
                </div>
                {registrationLoading ? (
                  <button type="button" className="mt-8 w-full flex justify-center items-center rounded-lg bg-primary px-4 py-2 text-white" disabled>
                    <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="font-medium"> Processing... </span>
                  </button>
                ) : (
                  <button
                    disabled={closeRegis ? true : false}
                    type="submit"
                    className={`mt-8 w-full inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${!closeRegis
                      ? "bg-primary focus-visible:outline-primary hover:bg-secondary"
                      : "bg-slate-300"
                      }`}
                  >
                    <p>Registrasi</p>
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
        {/* image kanan */}
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
            src="https://images.unsplash.com/photo-1559628233-eb1b1a45564b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dWJ1ZHxlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt="bg"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
