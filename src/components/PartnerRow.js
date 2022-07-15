import * as React from "react";
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from "prop-types";

const PartnerRow = ({ partnerRow }) => (
  <div className="select-none text-6xl text-slate mb-4 lg:text-11xl lg:mb-6">
    <Swiper
      className="marquee"
      modules={[Autoplay]}
      dir={partnerRow.direction}
      spaceBetween={0}
      loop={true}
      loopedSlides={50}
      centeredSlides={true}
      allowTouchMove={false}
      slidesPerView="auto"
      speed={6000}
      autoplay={{delay: 1}}
    >
      {partnerRow.partners.map((partner, index) => (
        <SwiperSlide key={index} className={`w-auto px-2 ${index % 2 === 0 ? 'font-sans' : 'font-serif'} ${index % 3 === 0 ? 'italic' : 'not-italic'}`}>{partner.text}</SwiperSlide>
      ))}
    </Swiper>
  </div>
);

PartnerRow.propTypes = {
  direction: PropTypes.string,
  partners: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
};

export default PartnerRow;
