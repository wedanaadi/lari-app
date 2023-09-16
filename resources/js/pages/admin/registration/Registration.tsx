import ConfirmDialog from "@/components/ConfirmDialog";
import { ToastNotification } from "@/components/ToastNotification";
import { ToDate } from "@/components/date";
import Pagination from "@/components/pagination/Pagination";
import { useEmailVerification } from "@/features/email";
import { useFRegistrationList, useFindVerifier, useUpdateVerification } from "@/features/registration";
import { ResetAuthValue } from "@/lib/auth";
import { baseApi } from "@/lib/baseUrl";
import { TItemId, TRegistration, TSelectValue } from "@/lib/types";
import useStore from "@/store/useStore";
import clsx from "clsx";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineQuestion } from "react-icons/ai";
import { BiSolidUserDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Combobox from "react-tailwindcss-select";

export default function Registration() {
  const dataLogin = useStore((state) => state.dataLogin)
  const [isDialogVerifiedOpen, setIsDialogVerifiedOpen] = useState(false)
  const [isDialogVerifikatorOpen, setIsDialogVerifikatorOpen] = useState(false)
  const [isDialogExportOpen, setIsDialogExportOpen] = useState(false)
  const [verifiedId, setVerifiedId] = useState<TItemId>("")
  const [exportAksi, setExportAksi] = useState<TSelectValue>({
    value: "all",
    label: "All",
  })
  const [content, setContent] = useState('');
  const navigasi = useNavigate()
  const [perPage, setPerPage] = useState<TSelectValue>({
    value: "10",
    label: "10",
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const tokenLogin = useStore((state) => state.token)
  const actionLogin = useStore((state) => state.changeDataLogin)

  const {
    data: registration,
    isLoading: registrationIsLoading,
    isError: registrationIsError,
    refetch: registrationRefetch,
  } = useFRegistrationList({
    currentPage: currentPage,
    perpage: parseInt(perPage.value),
    onSearch: search,
    token: tokenLogin,
    onError: (err) => {
      if (err.response) {
        let message = "Gagal load data registration"
        if (err.response.status === 401) {
          message = "Token login expired"
          actionLogin(ResetAuthValue)
          localStorage.clear()
          navigasi("/login");
        }
        ToastNotification({
          message,
          type: 'error'
        })
      }
    },
  });

  const optionsPage = [
    {
      value: "10",
      label: "10",
    },
    {
      value: "25",
      label: "25",
    },
    {
      value: "50",
      label: "50",
    },
    {
      value: "100",
      label: "100",
    },
  ];

  const optionsAksi = [
    {
      value: "verified",
      label: "Verified",
    },
    {
      value: "unverified",
      label: "Unverified",
    },
    {
      value: "all",
      label: "All",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setCurrentPage(1)
    const newTypingTimeout = setTimeout(() => {
      // Lakukan tindakan setelah pengguna selesai mengetik
      registrationRefetch()
    }, 500);
    setTypingTimeout(newTypingTimeout);
  }

  const handleEdit = (data: TRegistration) => {
    navigasi('detail', {
      state: {
        data
      }
    })
  }

  const { mutate: sendEmail } = useEmailVerification({
    onSuccess: () => { }
  })

  const { mutate: updateVerification } = useUpdateVerification({
    onSuccess: (response) => {
      sendEmail(response.data)
      ToastNotification({
        message: "Verification Successfuly",
        type: "success",
      });
      registrationRefetch();
    },
  });

  const handleConfirm = (id: TItemId) => {
    // Lakukan tindakan yang Anda inginkan saat tombol "Konfirmasi" diklik
    const Data = {
      body: {
        user_id: dataLogin.id
      },
      id,
      token:tokenLogin
    }
    updateVerification(Data)
    // Misalnya, menghapus sesuatu atau melakukan tindakan lainnya.
    setIsDialogVerifiedOpen(false); // Tutup dialog setelah konfirmasi.
    setVerifiedId("")
  };

  const handleExport = (id: TItemId) => {
    window.open(`${baseApi}/export/${id}`, "_blank")
    setExportAksi({
      value: "all",
      label: "All",
    })
  }

  const { mutate: findVerifier } = useFindVerifier({
    onSuccess: (response) => {
      const htmlContent = `<p>
                            <strong>Nama Verikator :</strong> ${response.data.user.name}
                          </p>
                          <p>
                            <strong>Tanggal Verifikator :</strong> Diverifikasi pada ${ToDate(response.data.created_at)}
                          </p>`;
      setContent(htmlContent)
      setIsDialogVerifikatorOpen(true)
    },
  })

  return (
    <>
      <ConfirmDialog
        isOpen={isDialogVerifiedOpen}
        onClose={() => setIsDialogVerifiedOpen(false)}
        onConfirm={handleConfirm}
        title="Konfirmasi Hapus"
        itemId={verifiedId}
      >
        <p className="my-4 text-gray-600 text-lg leading-relaxed">
          Anda yakin ingin memvalidasi user ini?
        </p>
      </ConfirmDialog>

      <ConfirmDialog
        isOpen={isDialogExportOpen}
        onClose={() => setIsDialogExportOpen(false)}
        onConfirm={handleExport}
        title="Export Data"
        itemId={exportAksi.value}
        textButton="Export"
      >
        <p className="my-4 text-gray-600 text-lg leading-relaxed">
          Pilih Aksi?
        </p>
        <Combobox
          value={exportAksi}
          onChange={(e) => {
            const textstring = JSON.stringify(e);
            setExportAksi(JSON.parse(textstring));
          }}
          options={optionsAksi}
          primaryColor="red"
        />
      </ConfirmDialog>

      <ConfirmDialog
        isOpen={isDialogVerifikatorOpen}
        onClose={() => setIsDialogVerifikatorOpen(false)}
        onConfirm={() => { }}
        title="Info Verifikator"
        itemId={verifiedId}
        isConfirmShow={false}
      >
        <div className="mt-4" id="contentVerifier" dangerouslySetInnerHTML={{ __html: content }}>
          {/*  */}
        </div>
      </ConfirmDialog>

      <div
        className={clsx(
          "w-full",
          "bg-white rounded-t-2xl rounded-b-md shadow-md"
        )}
      >
        <div
          className={clsx(
            "p-4 rounded-t-2xl",
            "flex items-center justify-between border-b-[1px] border-gray-300"
          )}
        >
          <h1 className="sm:text-2xl font-semibold">Registration Data</h1>
          <button
            onClick={() => {
              setIsDialogExportOpen(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            {/* <IoIosAdd /> &nbsp; */}
            <span>Export</span>
          </button>
        </div>
        <div className="p-4">
          <div className="md:flex md:gap-x-5 md:mb-3 mb-1">
            <div className="w-full md:w-1/12 mb-1 sm:mb-0">
              <Combobox
                value={perPage}
                onChange={(e) => {
                  const textstring = JSON.stringify(e);
                  setPerPage(JSON.parse(textstring));
                }}
                options={optionsPage}
                primaryColor="red"
              />
            </div>

            <input
              placeholder="Search...."
              onChange={handleSearch}
              type="text"
              className={clsx(
                "block w-full md:w-3/12 ml-auto rounded-md border-0 px-2 py-1.5 ",
                "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                "focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none"
              )}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-2 border-third text-center text-base font-light">
              <thead className="border-b border-third font-medium">
                <tr className="bg-four">
                  <th
                    scope="col"
                    className="border-r border-third px-6 py-4 w-1/12"
                  >
                    #
                  </th>
                  <th scope="col" className="border-r border-third px-6 py-4">
                    Registration Number
                  </th>
                  <th
                    scope="col"
                    className="border-r border-third px-6 py-4 w-1/12"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="border-r border-third px-6 py-4 w-1/12"
                  >
                    BiB Name
                  </th>
                  <th
                    scope="col"
                    className="border-r border-third px-6 py-4 w-1/12"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="border-r border-third px-6 py-4 w-3/12"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrationIsLoading && (
                  <tr>
                    <td colSpan={6}>loading......</td>
                  </tr>
                )}
                {!registrationIsLoading &&
                  !registrationIsError &&
                  registration.data?.data.length > 0
                  ? registration.data?.data.map((row, index) => (
                    <tr
                      className="border-b font-medium even:bg-white odd:bg-slate-100"
                      key={index}
                    >
                      <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                        {index + registration.data.from}
                      </td>
                      <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                        {row.registration_number}
                      </td>
                      <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                        {row.full_name}
                      </td>
                      <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                        {row.bib_name}
                      </td>
                      <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                        {row.status === "verified" && (
                          <div className="relative inline-flex items-center px-4 py-1 text-md text-center bg-green-200 rounded-full text-md font-medium text-green-700 uppercase">
                            Verified
                            {/* <span className="sr-only">Notifications</span> */}
                            <div className={clsx(
                              "absolute inline-flex items-center justify-center w-6 h-6",
                              "text-xs font-bold text-white cursor-pointer",
                              "bg-red-500 border-2 border-white rounded-full -top-2 -right-2"
                            )}
                              onClick={() => {
                                const data = {
                                  id:row.id,
                                  token:tokenLogin
                                }
                                findVerifier(data)
                                // setVerifiedId(row.id);
                                // setIsDialogVerifikatorOpen(true);
                              }}
                            >
                              <AiOutlineQuestion />
                            </div>
                          </div>
                        )}
                        {row.status === "unverified" && (
                          <span className="rounded-full bg-red-200 px-4 py-1 text-md font-medium text-red-700 uppercase">
                            Unverified
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium flex justify-center">
                        <button
                          onClick={() => handleEdit(row)}
                          type="button"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
                        >
                          <BiSolidUserDetail /> &nbsp;
                          <span>Details</span>
                        </button>
                        {row.status !== "verified" ? (
                          <>
                            &nbsp;
                            <button
                              type="button"
                              onClick={() => {
                                setVerifiedId(row.id);
                                setIsDialogVerifiedOpen(true);
                              }}
                              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded flex items-center"
                            >
                              <AiOutlineCheck /> &nbsp;
                              <span>Verifikasi</span>
                            </button>
                          </>
                        ) : (
                          false
                        )}
                      </td>
                    </tr>
                  ))
                  : !registrationIsLoading &&
                  !registrationIsError && (
                    <tr>
                      <td colSpan={6}>Tidak ada data</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
          {registration ? (
            <Pagination
              className="text-xs md:text-base"
              currentPage={currentPage}
              totalCount={registration.data.total}
              pageSize={registration.data.per_page}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          ) : (
            false
          )}
        </div>
      </div>
    </>
  );
}
