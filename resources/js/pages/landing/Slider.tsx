import Carousel from '@/components/Caraosel';
import { basePublic } from '@/lib/baseUrl';
import { TThemeSponsorship } from '@/lib/types';

interface SlideProps {
  data: TThemeSponsorship[],
  isLoading: boolean,
  isError: boolean
}

export default function Slider({ data, isError, isLoading }: SlideProps): JSX.Element {
  const photo = data.map((images) => basePublic + '/images-data/sponsorship/' + images.image) || [];
  return (
    <div className="bg-slate-400 flex flex-col justify-center items-center py-12">
      <h1 className="text-secondary text-lg mb-2 font-bold md:mb-10">
        Powered By
      </h1>
      {!isLoading && !isError && (<Carousel images={photo} autoplayDelay={4000} />)}
    </div>
  )
}
