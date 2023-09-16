import { ToastNotification } from "@/components/ToastNotification"
import Pagination from "@/components/pagination/Pagination"
import { useFetchOtherSetting } from "@/features/othersetting"
import { TOtherSettingScheme, TSelectValue } from "@/lib/types"
import useStore from "@/store/useStore"
import clsx from "clsx"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import Combobox from "react-tailwindcss-select";

export default function ViewOtherSetting() {
  const navigasi = useNavigate()
  const [perPage, setPerPage] = useState<TSelectValue>({
    value: "10",
    label: "10",
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const actionLogin = useStore((state) => state.changeDataLogin)
  const tokenLogin = useStore((state) => state.token)

  const {
    data: otherSetting,
    isLoading: otherSettingIsLoading,
    isError: otherSettingIsError,
    refetch: otherSettingRefetch
  } = useFetchOtherSetting({
    currentPage: currentPage,
    perpage: parseInt(perPage.value),
    onSearch: search,
    token: tokenLogin,
    onError: (err) => {
      if (err.response) {
        let message = "Gagal load data other setting"
        if (err.response.status === 401) {
          message = "Token login expired"
          actionLogin({
            accessToken: "",
            user_data: {
              id: "",
              role: "",
              status: "",
              username: "",
              password: "",
              name: "",
              phone: "",
            }
          })
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
      otherSettingRefetch()
    }, 500);
    setTypingTimeout(newTypingTimeout);
  }

  const handleEdit = (data: TOtherSettingScheme) => {
    navigasi('edit', {
      state: {
        data
      }
    })
  }
  return (
    <>
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
          <h1 className="sm:text-2xl font-semibold">Other Setting</h1>
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
                    Keterangan
                  </th>
                  <th scope="col" className="border-r border-third px-6 py-4 w-1/12">
                    Value
                  </th>
                  <th scope="col" className="border-r border-third px-6 py-4 w-1/12">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {otherSettingIsLoading && (
                  <tr>
                    <td colSpan={5}>loading......</td>
                  </tr>
                )}
                {
                  !otherSettingIsLoading && !otherSettingIsError && otherSetting.data?.data.length > 0 ? (
                    otherSetting.data?.data.map((row, index) => (
                      <tr
                        className="border-b font-medium even:bg-white odd:bg-slate-100"
                        key={index}
                      >
                        <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                          {index + otherSetting.data.from}
                        </td>
                        <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                          {row.keterangan}
                        </td>
                        <td className="whitespace-nowrap border-r border-third px-6 py-1 font-medium">
                          {row.value}
                        </td>
                        <td className="mt-1 whitespace-nowrap border-r border-third px-6 py-1 font-medium flex justify-between">
                          <button onClick={() => handleEdit(row)} type="button" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex items-center">
                            <AiOutlineEdit /> &nbsp;
                            <span>Ubah</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : !otherSettingIsLoading && !otherSettingIsError && (
                    <tr>
                      <td colSpan={5}>Tidak ada data</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          {otherSetting ? (
            <Pagination
              className="text-xs md:text-base"
              currentPage={currentPage}
              totalCount={otherSetting.data.total}
              pageSize={otherSetting.data.per_page}
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
