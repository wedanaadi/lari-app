import { TThemeHeader } from "@/lib/types";

interface HeaderProps {
  data: TThemeHeader,
}

export default function Header({ data }: HeaderProps): JSX.Element {
  return (
    <div className='px-12 py-64 flex flex-col items-center md:block sm:py-12 sm:block bg-center bg-cover bg-no-repeat bg-[url("https://images.unsplash.com/photo-1646928232133-8b2e82546057?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80")]'>
      <h1 className="font-poppins mb-8 md:mb-16 text-2xl font-bold md:text-8xl md:text-left text-center text-white">
        {data?.event_name_white} {" "}
        <span className="text-primary">{data?.event_name_red}</span>
      </h1>
      {/* <h1 className="font-poppins mb-8 md:mb-16 text-xl font-bold md:text-5xl md:text-left text-center text-white">
        Bersama {" "}
        <span className="text-primary">THE KING OF SPARKO</span>
      </h1> */}
      <a href="#FormDaftar">
        <button className="font-poppins bg-primary w-full md:w-5/12 px-4 hover:bg-secondary font-bold text-white text-sm py-2 md:py-4 md:text-3xl md:px-10 rounded-full mb-8 md:mb-16 transition ease-in-out duration-300">
          Daftar Sekarang
        </button>
      </a>
      <h1 className="font-poppins mb-8 md:mb-16 font-bold text-2xl text-center md:text-6xl md:text-left text-white">
      {data?.location}
      </h1>
      <div className="flex items-center justify-center md:justify-start md:items-start md:mb-14">
        <div className="mr-16">
          <h1 className="font-poppins md:text-3xl text-md font-bold text-white">
          {data?.regency}
          </h1>
          <p className="font-Montserrat md:text-xl text-sm text-white">{data?.state}</p>
        </div>
        <div>
          <h1 className="font-poppins md:text-3xl text-md font-bold text-white">
          {data?.date}
          </h1>
          <p className="font-Montserrat md:text-xl text-sm text-white">Start: {data?.time}</p>
        </div>
      </div>
    </div>
  )
}
