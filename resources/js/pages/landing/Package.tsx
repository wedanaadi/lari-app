import NumericFormat from "@/components/NumericFormat"
import { TThemeCategories } from "@/lib/types"

interface CategoriesProps {
  data: TThemeCategories[]
}

export default function Package({ data }: CategoriesProps): JSX.Element {
  return (
    <div>
      {data.map((row, index) => {
        return (
          <div key={index}>
            <div className="flex flex-col items-center md:flex-row md:px-8 md:items-start md:justify-between">
              <div className="mt-12 flex flex-col items-center mb-12">
                <h1 className="text-gray-400 text-sm mb-2 font-bold md:mb-10">
                  Distance
                </h1>
                <h1 className="text-black text-6xl font-bold md:text-5xl">
                  {row.distance}<span className="text-sm md:text-xl">km</span>
                </h1>
              </div>
              <div className="mt-12 flex flex-col items-center mb-12">
                <h1 className="text-gray-400 text-sm mb-2 font-bold md:mb-10">
                  Biaya Pendaftaran
                </h1>
                <h1 className="text-black text-2xl font-bold md:text-xl">
                  IDR<span className="text-5xl md:text-4xl"> <NumericFormat value={row.price} thousandSeparator="," decimalSeparator="." /></span>
                </h1>
              </div>
              <div className="mt-12 flex flex-col items-center mb-12">
                <h1 className="text-gray-400 text-sm mb-2 font-bold md:mb-10">
                  Kategori
                </h1>
                <h1 className="text-black text-2xl font-bold md:text-xl">
                  {row.name}
                </h1>
              </div>
            </div>
            <hr className="border-b-2 block sm:hidden border-dashed border-secondary" />
          </div>
        )
      })}
      {/* <div className="flex flex-col items-center md:flex-row md:px-8 md:items-start md:justify-between">
        <div className="mt-12 flex flex-col items-center mb-12">
          <h1 className="text-gray-400 text-sm mb-2 font-bold md:mb-10">
            Distance
          </h1>
          <h1 className="text-black text-6xl font-bold md:text-5xl">
            5/10<span className="text-sm md:text-xl">km</span>
          </h1>
        </div>
        <div className="mt-12 flex flex-col items-center mb-12">
          <h1 className="text-gray-400 text-sm mb-2 font-bold md:mb-10">
            Biaya Pendaftaran
          </h1>
          <h1 className="text-black text-2xl font-bold md:text-xl">
            IDR<span className="text-5xl md:text-4xl">175,000</span>
          </h1>
        </div>
        <div className="mt-12 flex flex-col items-center mb-12">
          <h1 className="text-gray-400 text-sm mb-2 font-bold md:mb-10">
            Kategori
          </h1>
          <h1 className="text-black text-2xl font-bold md:text-xl">
            Umum
          </h1>
        </div>
      </div> */}

      {/* <div className="flex flex-col items-center md:flex-row md:px-8 md:items-start md:justify-between">
        <div className="mt-12 flex flex-col items-center mb-12">
          <h1 className="text-black text-6xl font-bold md:text-5xl">
            5/10<span className="text-sm md:text-xl">km</span>
          </h1>
        </div>
        <div className="mt-12 flex flex-col items-center mb-12">
          <h1 className="text-black text-2xl font-bold md:text-xl">
            IDR<span className="text-5xl md:text-4xl">130,000</span>
          </h1>
        </div>
        <div className="mt-12 flex flex-col items-center mb-12">
          <h1 className="text-black text-2xl font-bold md:text-xl">
            Pelajar
          </h1>
        </div>
      </div> */}
    </div>
  )
}
