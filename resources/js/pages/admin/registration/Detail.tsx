import { basePublic } from "@/lib/baseUrl";
import clsx from "clsx";
import { IoIosArrowDropleft } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

export default function Detail() {
  const { state } = useLocation();
  const { data: dataProfile } = state;

  return (
    <div
      className={clsx("w-full md:w-1/2", "bg-white rounded-t-2xl rounded-b-md shadow-md")}
    >
      <div
        className={clsx(
          "p-4 rounded-t-2xl",
          "flex items-center justify-between border-b-[1px] border-gray-300"
        )}
      >
        <h1 className="sm:text-2xl font-semibold">Registration Detail List</h1>
        <Link
          to={"/admin/registrations"}
          className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <IoIosArrowDropleft /> &nbsp;
          <span>Kembali</span>
        </Link>
      </div>
      <div className="p-4">
        {/* Content */}
        <div className="container mx-auto py-4">
          <div className="max-w-xs rounded-lg shadow p-8 md:flex">
            {/* Gambar Profil */}
            <div className="w-full">
              <img
                src={
                  basePublic +
                  `/images-data/users/${
                    dataProfile.gender === "Laki-Laki" ? "mc.jpg" : "wc.jpg"
                  }`
                }
                alt="Foto Profil"
                className="mx-auto w-32 h-32 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold">{dataProfile.full_name}</h2>
              <p className="text-gray-600">{dataProfile.bib_name}</p>
            </div>
          </div>
        </div>

        {/* Informasi Profil */}
        <div className="md:w-2/3 mt-4 md:mt-0">
          <h3 className="text-2xl font-semibold">Informasi Profil</h3>
          <div className="mt-4">
            <p>
              <strong>Nomor Indentitas:</strong> {dataProfile.identity_number}
            </p>
            <p>
              <strong>Email:</strong> {dataProfile.email}
            </p>
            <p>
              <strong>Telepon:</strong> {dataProfile.phone}
            </p>
            <p>
              <strong>Tanggal Lahir:</strong> {dataProfile.date_of_birth}
            </p>
            <p>
              <strong>Jenis Kelamin:</strong> {dataProfile.gender}
            </p>
            <p>
              <strong>Golongan Darah:</strong> {dataProfile.bood_type}
            </p>
            <p>
              <strong>Ukuran Baju:</strong> {dataProfile.size_jersey}
            </p>
            <p>
              <strong>Nama Kontak Darurat:</strong>{" "}
              {dataProfile.emergency_contact_name}
            </p>
            <p>
              <strong>Phone Kontak Darurat:</strong>{" "}
              {dataProfile.emergency_contact_phone}
            </p>
            <p>
              <strong>Vaksin Covid:</strong> {dataProfile.covid_vaccine}
            </p>
            <p>
              <strong>Kota:</strong> {dataProfile.regency}
            </p>
            <p>
              <strong>Kewarganegaraan:</strong> {dataProfile.state}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
