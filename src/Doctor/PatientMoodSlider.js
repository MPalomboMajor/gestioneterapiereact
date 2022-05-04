import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default (props) => {
  const slides = props.patientDailyMoods;
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
        <SwiperSlide className="swiper-slide"><p className="date">01/02/22</p>
          <div className="upper-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-umore-1.svg" />
          </div>
          <div className="row-label" data-label="Umore" />
          <div className="lower-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-emozione-1.svg" />
          </div>
          <div className="row-label" data-label="Emozione" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"><p className="date">01/02/22</p>
          <div className="upper-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-umore-2.svg" />
          </div>
          <div className="row-label" data-label="Umore" />
          <div className="lower-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-emozione-2.svg" />
          </div>
          <div className="row-label" data-label="Emozione" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"> <p className="date">01/02/22</p>
          <div className="upper-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-umore-3.svg" />
          </div>
          <div className="row-label" data-label="Umore" />
          <div className="lower-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-emozione-3.svg" />
          </div>
          <div className="row-label" data-label="Emozione" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"> <p className="date">01/02/22</p>
          <div className="upper-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-umore-4.svg" />
          </div>
          <div className="row-label" data-label="Umore" />
          <div className="lower-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-emozione-4.svg" />
          </div>
          <div className="row-label" data-label="Emozione" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"> <p className="date">01/02/22</p>
          <div className="upper-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-umore-5.svg" />
          </div>
          <div className="row-label" data-label="Umore" />
          <div className="lower-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-emozione-5.svg" />
          </div>
          <div className="row-label" data-label="Emozione" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"> <p className="date">01/02/22</p>
          <div className="upper-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-umore-5.svg" />
          </div>
          <div className="row-label" data-label="Umore" />
          <div className="lower-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-emozione-6.svg" />
          </div>
          <div className="row-label" data-label="Emozione" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"> <p className="date">01/02/22</p>
          <div className="upper-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-umore-2.svg" />
          </div>
          <div className="row-label" data-label="Umore" />
          <div className="lower-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-emozione-7.svg" />
          </div>
          <div className="row-label" data-label="Emozione" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"> <p className="date">01/02/22</p>
          <div className="upper-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-umore-1.svg" />
          </div>
          <div className="row-label" data-label="Umore" />
          <div className="lower-wrapper">
            <img src="http://localhost:3000/img/mood/OA_icon-emozione-8.svg" />
          </div>
          <div className="row-label" data-label="Emozione" /></SwiperSlide>

      </div>
      {/* If we need pagination */}
      <div className="swiper-pagination" />
      {/* If we need navigation buttons */}
      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
    </Swiper>
  );
};
