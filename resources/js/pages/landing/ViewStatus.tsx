import { useFetchProfile } from '@/features/landing'
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom'

export default function ViewStatus() {
  const { email, noReg } = useParams()

  const paramEmail = email ? email : '0';
  const paramNomor = noReg ? noReg : '0';

  const { data: profile, isLoading: profileLoading, isError } = useFetchProfile({
    onError: (err: AxiosError) => {
      console.log(err.response?.statusText);
    }
  }, paramNomor, paramEmail)

  if (!profileLoading && !isError) {
    console.log(profile);
  }

  return (
    <>
      {!profileLoading && !isError ? (
        <main>
          <section className="relative block h-[500px]">
            <div className='absolute top-0 w-full h-full bg-center bg-cover bg-no-repeat bg-[url("https://images.unsplash.com/photo-1646928232133-8b2e82546057?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80")]'>
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>

            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0px)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x={0}
                y={0}
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>

          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-end">
                    <div className="w-full lg:w-4/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <h1>Nomor Registrasi: {profile?.data.registration_number}</h1>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0 flex gap-x-2 justify-end items-center">
                        {/* <Link
                      to={"/"}
                      className="bg-slate-400 text-slate-800 active:bg-slate-800 uppercase active:text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Kembali
                    </Link>
                    {data.data.is_validasi === "unverified" && (
                      <button
                        className="bg-primary active:bg-secondary uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handlePayment}
                      >
                        Klik untuk melakukan Pembayaran
                      </button>
                    )} */}
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                      {profile?.data.full_name}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                      {profile?.data.status === "verified" && (
                        <span className="rounded-full bg-green-200 px-4 py-2 text-md font-medium text-green-700">
                          VERIFIED
                        </span>
                      )}
                      {profile?.data.status === "unverified" && (
                        <span className="rounded-full bg-red-200 px-4 py-2 text-md font-medium text-red-700">
                          NOT VERIFIED
                        </span>
                      )}
                    </div>
                    <div className="mb-2 text-blueGray-600 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
                      Your status is not verified because we have not received your
                      payment. If you believe there is a mistake, please contact us.
                    </div>
                    <div className="mb-2 text-blueGray-600 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
                      Email register: {profile?.data.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main>
          <section className="relative block h-[500px]">
            <div className='absolute top-0 w-full h-full bg-center bg-cover bg-no-repeat bg-[url("https://images.unsplash.com/photo-1646928232133-8b2e82546057?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80")]'>
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>

            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0px)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x={0}
                y={0}
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>

          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-end">
                    <div className="w-full lg:w-4/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0 flex gap-x-2 justify-end items-center">

                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                  </div>
                  <div className="text-center mt-12">

                  </div>
                  <div className="mb-2 text-center text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
                    Data Tidak Ditemukan
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
    // <>
    //   {found ? (

    //   ) : (

    //   )}
    // </>
  )
}
