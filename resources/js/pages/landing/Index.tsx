import Loader from "@/components/Loader"
import { useFetchCanva, useFetchCategories, useFetchHeader, useFetchSponsorship } from "@/features/landing"
import React, { Suspense } from "react"
const Header = React.lazy(() => import('./Header'))
const Package = React.lazy(() => import('./Package'))
const Form = React.lazy(() => import('./RegisterForm'))
const MyStatus = React.lazy(() => import('./MyStatus'))
const Slider = React.lazy(() => import('./Slider'))
const Tutorial = React.lazy(() => import('./Tutorial'))

export default function Index() {
  const isShowCanva = import.meta.env.VITE_SHOW_CANVA;
  const { data: headers, isLoading: headerLoading } = useFetchHeader({
    onError: () => { }
  })
  const { data: categories, isLoading: categoriesLoading } = useFetchCategories({
    onError: () => { }
  })
  const { data: sponsorship, isLoading: sponsorshipLoading, isError: sponsorshipError } = useFetchSponsorship({
    onError: () => { }
  })
  const { data: canva, isLoading: canvaIsLoading } = useFetchCanva({
    onError: () => { }
  })
  return (
    <div className="overflow-y-auto">
      <Suspense fallback={<Loader />}>
        {!headerLoading && headers && (<Header data={headers.data} />)}
        {!categoriesLoading && categories && (<Package data={categories.data} />)}
        {isShowCanva === 'show' && !canvaIsLoading && canva && (<Tutorial data={canva.data} />)}
        {!categoriesLoading && categories && (<Form categories={categories.data} />)}
        {!categoriesLoading && categories && (<MyStatus />)}
        {!sponsorshipLoading && sponsorship && (<Slider isError={sponsorshipError} isLoading={sponsorshipLoading} data={sponsorship.data} />)}
      </Suspense>
    </div>
  )
}
