'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const logos_one = [
  "1.webp", "2.webp", "3.webp", "4.webp", "5.webp",
  "6.webp", "7.webp", "8.webp", "9.webp", "10.webp",
  "11.webp", "12.webp", "13.webp", "14.webp", "15.webp",
  "16.webp", "17.webp", "18.webp", "19.webp", "20.webp",
  "21.webp", "22.webp", "23.webp", "24.webp", "25.webp"
];

const logos_two = [
  "26.webp", "27.webp", "28.webp", "29.webp", "30.webp",
  "31.webp", "32.webp", "33.webp", "34.webp", "35.webp",
  "36.webp", "37.webp", "38.webp", "39.webp", "40.webp",
  "41.webp", "42.webp", "43.webp", "44.webp", "45.webp",
  "46.webp", "47.webp", "48.webp", "49.webp"
];
const LogoMarquee = () => {
  return (
    <section className="py-12">
      <div className="container relative">
          <h2 className='text-center section-title'>Trusted Voices</h2>
          <div className="max-lg:hidden absolute top-0 left-0 w-[200px] h-full z-10 pointer-events-none bg-gradient-to-l from-transparent via-black/80 to-black" />
          <div className="max-lg:hidden absolute top-0 right-0 w-[200px] h-full z-10 pointer-events-none bg-gradient-to-r from-transparent via-black/80 to-black" />
         
        {/* Top slider */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={3000}
          loop={true}
          freeMode={true}
          className="logos-swiper"
        >
          {logos_one.map((i) => (
            <SwiperSlide key={`top-${i}`} className="!w-[200px] !h-[78px]">
                <div className="logo-item">
                  <img src={`/logos/${i}`} />
                </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom slider (reversed direction) */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true
          }}
          speed={3000}
          loop={true}
          freeMode={true}
          className="logos-swiper mt-6"
        >
          {logos_two.map((i) => (
            <SwiperSlide key={`bottom-${i}`} className="!w-[200px] !h-[78px]">
                <div className="logo-item">
                  <img src={`/logos/${i}`} />
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LogoMarquee;