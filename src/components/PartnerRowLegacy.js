import * as React from "react";
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from "prop-types";

const PartnerRow = ({ partnerRow }) => (
  <div className="select-none text-6xl tracking-tight text-slate mb-4 lg:text-11xl lg:mb-6">
    <Swiper
      className="marquee"
      modules={[Autoplay]}
      spaceBetween={0}
      loop={true}
      loopedSlides={50}
      centeredSlides={true}
      allowTouchMove={false}
      slidesPerView="auto"
      speed={6000}
      autoplay={{delay: 1, reverseDirection: partnerRow.direction === 'ltr'}}
    >
      {partnerRow.partners.map((partner, index) => (
        <SwiperSlide key={index} className="w-auto px-3">
          <a href={partner.url} target="_blank" className={`transition-colors duration-300 ease-in-out ${partner.colorClassName} ${partner.fontClassName}`}>
            {partner.text}
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

PartnerRow.propTypes = {
  direction: PropTypes.string,
  partners: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      url: PropTypes.string,
      fontClassName: PropTypes.string,
    })
  ),
};

export default PartnerRow;
