import React from 'react';
import { useMediaQuery } from 'react-responsive';
import SwiperCore from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Autoplay, Navigation, Pagination]);

interface CarouselProps {
  images: string[]; // Daftar gambar untuk carousel
  autoplayDelay?: number; // Delay autoplay (default: 3000ms)
  spaceBetween?:number
  slidesPerView?:number
}

const Carousel: React.FC<CarouselProps> = ({ images, autoplayDelay = 3000, spaceBetween=0, slidesPerView=5 }) => {
  const isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={Math.min(images.length, isTabletMid? 1 : slidesPerView)}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className='mx-auto w-44 h-auto' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
