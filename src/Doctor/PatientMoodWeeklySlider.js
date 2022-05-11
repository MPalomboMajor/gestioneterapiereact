import { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default (props) => {
  const [slides, setSlides] = useState(props.patientWeeklyMoods);
  console.log(props.patientWeeklyMoods);

  return (
    <Swiper
      // install Swiper modules
      className="swiper weekly-mood-carousel"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={2}
      slidesPerGroup={2}
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
        576: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1200: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
      }}
    >
      <div className="swiper-wrapper">
        {props.patientWeeklyMoods?.map((slideContent) => (
          <SwiperSlide key={slideContent} className="swiper-slide"><p className="date">{slideContent.startDate}</p>
            <div className="upper-wrapper">
              <img src="https://picsum.photos/800/600/" />
            </div>
            <div className="row-label" data-label="Immagine" />
            <div className="lower-wrapper">
              <img src="./img/mood/OA_icon-colore-1.svg" />
            </div>
            <div className="row-label" data-label="Colore" />
          </SwiperSlide>
        ))}
      </div>
      
                    {/* <SwiperSlide key={slideContent} className="swiper-slide"><p className="date">{slideContent.dataOraRisposta}</p>
            <div className="upper-wrapper">
              <img src={slideContent.umore} />
            </div>
            <div className="row-label" data-label="Umore" />
            <div className="lower-wrapper">
              <img src={slideContent.emozione} />
            </div>
            <div className="row-label" data-label="Emozione" />
          </SwiperSlide> */}

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
