import { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { iconNotFoundSmall } from '../icons';

export default (props) => {
  const [slides, setSlides] = useState(props.patientDailyMoods);
  console.log(props.patientDailyMoods);

  return (
    <Swiper
      // install Swiper modules
      className="swiper mood-carousel"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={3}
      slidesPerGroup={3}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      }}
      breakpoints={{
        768: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
        1200: {
          slidesPerView: 7,
          slidesPerGroup: 7,
        },
      }}
    >
      <div className="swiper-wrapper">
        {props.patientDailyMoods?.map((slideContent) => (
          <SwiperSlide key={slideContent} className="swiper-slide"><p className="date">{slideContent.dataOraRisposta}</p>
            <div className="upper-wrapper">
              {slideContent.umore === "#" ? iconNotFoundSmall : <img src={slideContent.umore} />}
            </div>
            <div className="row-label" data-label="Umore" />
            <div className="lower-wrapper">
              {slideContent.emozione === "#" ? iconNotFoundSmall : <img src={slideContent.emozione} />}
            </div>
            <div className="row-label" data-label="Emozione" />
          </SwiperSlide>
        ))}
      </div>

      {/* <SwiperSlide className="swiper-slide"> <p className="date">01/02/22</p>
          <div className="upper-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-umore-1.svg" />
          </div>
          <div className="row-label" data-label="Umore" />
          <div className="lower-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-emozione-8.svg" />
          </div>
          <div className="row-label" data-label="Emozione" /></SwiperSlide> */}


      {/* If we need pagination */}
      <div className="swiper-pagination" />
      {/* If we need navigation buttons */}
      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
    </Swiper>
  );
};
