import ConfirmDialog from "@/components/ConfirmDialog"
import { ToastNotification } from "@/components/ToastNotification"
import Pagination from "@/components/pagination/Pagination"
import { useDeleteBank, useFetchBank } from "@/features/bank"
import { ResetAuthValue } from "@/lib/auth"
import { TBankScheme, TItemId, TSelectValue } from "@/lib/types"
import useStore from "@/store/useStore"
import clsx from "clsx"
import { useState } from "react"
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai"
import { IoIosAdd } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import Combobox from "react-tailwindcss-select";

export default function ViewBank() {
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false)
  const [bankId, setBankId] = useState<TItemId>("")
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
    data: bank,
    isLoading: bankIsLoading,
    isError: bankIsError,
    refetch: bankRefetch
  } = useFetchBank({
    currentPage: currentPage,
    perpage: parseInt(perPage.value),
    onSearch: search,
    token: tokenLogin,
    onError: (err) => {
      if (err.response) {
        let message = "Gagal load data bank"
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
      bankRefetch()
    }, 500);
    setTypingTimeout(newTypingTimeout);
  }

  const handleEdit = (data: TBankScheme) => {
    navigasi('edit', {
      state: {
        data
      }
    })
  }

  const { mutate: deletebank } = useDeleteBank({
    onSuccess: () => {
      ToastNotification({
        message: "bank delete Successfuly",
        type: "success",
      });
      bankRefetch();
    },
  });

  const handleConfirm = (id: TItemId) => {
    // Lakukan tindakan yang Anda inginkan saat tombol "Konfirmasi" diklik
    const dataBody = {
      id: id,
      token:tokenLogin
    };
    deletebank(dataBody)
    // Misalnya, menghapus sesuatu atau melakukan tindakan lainnya.
    setIsDialogDeleteOpen(false); // Tutup dialog setelah konfirmasi.
    setBankId("")
  };
  return (
    <>
      <ConfirmDialog
        isOpen={isDialogDeleteOpen}
        onClose={() => setIsDialogDeleteOpen(false)}
        onConfirm={handleConfirm}
        title="Konfirmasi Hapus"
        itemId={bankId}
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
          <h1 className="sm:text-2xl font-semibold">Data Bank</h1>
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
                    Nama Bank
                  </th>
                  <th scope="col" className="border-r border-third px-6 py-4 w-1/12">
                    No Rekening
                  </th>
                  <th scope="col" className="border-r border-third px-6 py-4 w-1/12">
                    Nama Rekening
                  </th>
                  <th scope="col" className="border-r border-third px-6 py-4 w-3/12">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {bankIsLoading && (
                  <tr>
                    <td colSpan={5}>loading......</td>
                  </tr>
                )}
                {
                  !bankIsLoading && !bankIsError && bank.data?.data.length > 0 ? (
                    bank.data?.data.map((row, index) => (
                      <tr
                        className="border-b font-medium even:bg-white odd:bg-slate-100"
                        key={index}
                      >
                        <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                          {index + bank.data.from}
                        </td>
                        <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                          {row.nama_bank}
                        </td>
                        <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                          {row.rekening}
                        </td>
                        <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                          {row.an}
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
                              setBankId(row.id)
                              setIsDialogDeleteOpen(true);
                            }} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center">
                            <AiFillDelete /> &nbsp;
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : !bankIsLoading && !bankIsError && (
                    <tr>
                      <td colSpan={5}>Tidak ada data</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          {bank ? (
            <Pagination
              className="text-xs md:text-base"
              currentPage={currentPage}
              totalCount={bank.data.total}
              pageSize={bank.data.per_page}
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
