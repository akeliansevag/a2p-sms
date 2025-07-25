'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const WhyMonty = () => {
  const items = [
    {
      img: '/why-1.webp',
      title: 'Direct to Operators',
      description:
        'No aggregators. Enjoy transparent, SLA-backed delivery with real-time visibility',
      icon: '/why-1.svg',
    },
    {
      img: '/why-2.webp',
      title: 'Blazing Fast APIs',
      description:
        'SMPP, HTTP, and REST APIs available for enterprise-grade speed and volume',
      icon: '/why-2.svg',
    },
    {
      img: '/why-3.webp',
      title: 'Delivery Reporting',
      description: 'Real-time DLRs and analytics to optimize every campaign',
      icon: '/why-3.svg',
    },
    {
      img: '/why-4.webp',
      title: 'Global Compliance',
      description: 'GDPR-ready and trusted across regulated industries',
      icon: '/why-4.svg',
    },
  ];

  const mainSwiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className='max-lg:py-12 lg:py-24'>
      <div className='container max-w-[775px] text-center'>
        <h2 className='section-title !mb-6'>Why Monty for SMS</h2>
      </div>

      <div className='container max-w-[1200px] mt-16'>
        <div className='flex max-lg:flex-col gap-10'>

          {/* Left: Square Image Slider */}
          <div className='w-full aspect-square rounded-2xl overflow-hidden'>
            <Swiper
              modules={[Autoplay, EffectFade]}
              onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              spaceBetween={0}
              effect='fade'
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className='h-full'
            >
              {items.map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className='w-full h-full object-cover'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right: Text Thumbnails */}
          <div className='w-full flex flex-col gap-6'>
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => mainSwiperRef.current?.slideToLoop(index)}
                className={`flex gap-4 items-start cursor-pointer p-4 rounded-lg transition-colors duration-300 ease-in-out ${
                  index === activeIndex
                    ? 'bg-gray-200 border-l-4 border-primary'
                    : 'hover:bg-gray-100'
                }`}
              >
                <img src={item.icon} alt={item.title} className='w-8 h-8 mt-1' />
                <div>
                  <h3 className='text-lg font-semibold'>{item.title}</h3>
                  <p className='text-sm text-gray-600'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyMonty;