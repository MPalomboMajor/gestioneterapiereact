import { useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function DiagnosticTestSlider(props) {

  return (
    <Swiper
      // install Swiper modules
      className="swiper report-carousel"
      modules={[Navigation, Pagination]}
      spaceBetween={40}
      loop={true}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{
        el: '.swiper-pagination',
        clickable: true,
      }}
    >
      <div className="swiper-wrapper">
        {props.imgsNames?.map((slideContent) => (
          <SwiperSlide key={slideContent} className="swiper-slide"><a href data-bs-toggle="modal" data-bs-target="#zoom" >
            <img src={slideContent} img-contain alt /></a>
          </SwiperSlide>
        ))}
        {/* <SwiperSlide className="swiper-slide"><a href data-bs-toggle="modal" data-bs-target="#zoom"><img src="https://picsum.photos/800/600/" img-contain alt /></a></SwiperSlide>
        <SwiperSlide className="swiper-slide"><a href data-bs-toggle="modal" data-bs-target="#zoom"><img src="https://picsum.photos/600/800/" img-contain alt /></a></SwiperSlide>
        <SwiperSlide className="swiper-slide"><a href data-bs-toggle="modal" data-bs-target="#zoom"><img src="https://picsum.photos/800/800/" img-contain alt /></a></SwiperSlide> */}
      </div>
      {/* If we need pagination */}
      <div className="swiper-pagination" />
      {/* If we need navigation buttons */}
      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
    </Swiper>
  );
};

export { DiagnosticTestSlider };
