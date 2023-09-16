import ConfirmDialog from "@/components/ConfirmDialog"
import { ToastNotification } from "@/components/ToastNotification"
import Pagination from "@/components/pagination/Pagination"
import { useDeleteSponsorship, useFetchSponsor } from "@/features/sistem"
import { ResetAuthValue } from "@/lib/auth"
import { basePublic } from "@/lib/baseUrl"
import { TItemId, TSelectValue, TThemeSponsorship } from "@/lib/types"
import useStore from "@/store/useStore"
import clsx from "clsx"
import { useState } from "react"
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai"
import { IoIosAdd } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import Combobox from "react-tailwindcss-select";

export default function Sponsorship() {
  const navigasi = useNavigate()
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false)
  const [sponsorshipId, setSponsorshipId] = useState<TItemId>("")
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
    data: sponsorship,
    isLoading: sponsorshipIsLoading,
    isError: sponsorshipIsError,
    refetch: sponsorshipRefetch,
  } = useFetchSponsor({
    currentPage: currentPage,
    perpage: parseInt(perPage.value),
    onSearch: search,
    token: tokenLogin,
    onError: (err) => {
      if (err.response) {
        let message = "Gagal load data sponsorship"
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setCurrentPage(1)
    const newTypingTimeout = setTimeout(() => {
      // Lakukan tindakan setelah pengguna selesai mengetik
      sponsorshipRefetch()
    }, 500);
    setTypingTimeout(newTypingTimeout);
  }

  const handleEdit = (data: TThemeSponsorship) => {
    navigasi('edit', {
      state: {
        data
      }
    })
  }

  const { mutate: deleteSponsorship } = useDeleteSponsorship({
    onSuccess: () => {
      ToastNotification({
        message: "Sponsorship delete Successfuly",
        type: "success",
      });
      sponsorshipRefetch();
    },
  });

  const handleConfirm = (id: TItemId) => {
    // Lakukan tindakan yang Anda inginkan saat tombol "Konfirmasi" diklik
    const dataBody = {
      id: id,
      token:tokenLogin
    };
    deleteSponsorship(dataBody)
    // Misalnya, menghapus sesuatu atau melakukan tindakan lainnya.
    setIsDialogDeleteOpen(false); // Tutup dialog setelah konfirmasi.
    setSponsorshipId("")
  };

  return (
    <>
      <ConfirmDialog
        isOpen={isDialogDeleteOpen}
        onClose={() => setIsDialogDeleteOpen(false)}
        onConfirm={handleConfirm}
        title="Konfirmasi Hapus"
        itemId={sponsorshipId}
      >
        <p className="my-4 text-gray-600 text-lg leading-relaxed">
          Anda yakin ingin menghapus item ini?
        </p>
      </ConfirmDialog>

      <div className={clsx(
        "w-full",
        "bg-white rounded-t-2xl rounded-b-md shadow-md"
      )}
      >
        <div className={clsx(
          "p-4 rounded-t-2xl",
          "flex items-center justify-between border-b-[1px] border-gray-300"
        )}
        >
          <h1 className="sm:text-2xl font-semibold">Setting Sponsorship Landing</h1>
          <Link to={'add'} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <IoIosAdd /> &nbsp;
            <span>Tambah</span>
          </Link>
        </div>
        <div className="p-4">
          <div className="md:flex md:gap-x-5 md:mb-3 mb-1">
            <div className="w-full md:w-1/12 mb-1 sm:mb-0">
              <Combobox
                value={perPage}
                onChange={(e) => {
                  const textstring = JSON.stringify(e);
                  setPerPage(JSON.parse(textstring))
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
                  <th scope="col" className="border-r border-third px-6 py-4 w-1/12">
                    #
                  </th>
                  <th scope="col" className="border-r border-third px-6 py-4">
                    Title
                  </th>
                  <th scope="col" className="border-r border-third px-6 py-4 w-1/12">
                    Image
                  </th>
                  <th scope="col" className="border-r border-third px-6 py-4 w-3/12">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {sponsorshipIsLoading && (
                  <tr>
                    <td colSpan={5}>loading......</td>
                  </tr>
                )}
                {
                  !sponsorshipIsLoading && !sponsorshipIsError && sponsorship.data?.data.length > 0 ? (
                    sponsorship.data?.data.map((row, index) => (
                      <tr
                        className="border-b font-medium even:bg-white odd:bg-slate-100"
                        key={index}
                      >
                        <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                          {index + sponsorship.data.from}
                        </td>
                        <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                          {row.title}
                        </td>
                        <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                          <img src={basePublic + '/images-data/sponsorship/' + row.image} alt={row.title} />
                        </td>
                        <td className="mt-1 whitespace-nowrap border-r border-third px-6 py-1 font-medium flex justify-between">
                          <button onClick={() => handleEdit(row)} type="button" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex items-center">
                            <AiOutlineEdit /> &nbsp;
                            <span>Ubah</span>
                          </button>
                          &nbsp;
                          <button
                            type="button"
                            onClick={() => {
                              setSponsorshipId(row.id)
                              setIsDialogDeleteOpen(true);
                            }} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center">
                            <AiFillDelete /> &nbsp;
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : !sponsorshipIsLoading && !sponsorshipIsError && (
                    <tr>
                      <td colSpan={5}>Tidak ada data</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          {sponsorship ? (
            <Pagination
              className="text-xs md:text-base"
              currentPage={currentPage}
              totalCount={sponsorship.data.total}
              pageSize={sponsorship.data.per_page}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          ) : (
            false
          )}
        </div>
      </div>
    </>
  )
}
