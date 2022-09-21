import * as React from "react";
import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";

const { useEffect, useRef } = React;

const PartnerRow = ({ partnerRow, offsetIndex }) => {
  const el = useRef(null);
  const controls = useAnimation();
  const controlParams = {
    x: [
      partnerRow.direction === 'ltr' ? 0 : -20000,
      partnerRow.direction === 'ltr' ? -20000 : 0
    ],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 300,
        ease: 'linear'
      }
    }
  };
  let currentActiveColor = offsetIndex ? offsetIndex * 2 : 0;
  const activeColors = [
    'text-electric-lime',
    'text-gray',
    'text-voltage',
    'text-summer-rain',
    'text-gray',
    'text-voltage'
  ];

  useEffect(() => {
    controls.start(controlParams);

    function sequenceActiveColor () {
      const avgWidth = window.innerWidth < 1000 ? 200 : 380;
      // const allVisible = window.innerWidth >= avgWidth * partnerRow.partners.length;
      const allVisible = true;

      if (allVisible) {
        const activeIndex = Math.floor(Math.random() * partnerRow.partners.length) + 1;
        const allEls = el.current.querySelectorAll('.partner-wordmark');
        const activeEls = el.current.querySelectorAll('.partner-wordmark:nth-child(' + activeIndex + ')')

        if (++currentActiveColor >= activeColors.length) {
          currentActiveColor = 0;
        }

        allEls.forEach((el) => {
          activeColors.forEach((color) => {
            el.classList.remove(color);
          });
        });

        activeEls.forEach((el) => {
          el.classList.add(activeColors[currentActiveColor]);
        });
      }
    }

    sequenceActiveColor();

    setTimeout(function() {
      setInterval(sequenceActiveColor, 3000);
    }, (offsetIndex ? offsetIndex * 1000 : 0));
  }, [])

  return (
    <div
      className="relative select-none overflow-hidden mb-4 md:mb-6"
      style={{ height: '1.1667em' }}
    >
      <motion.div
        ref={el}
        animate={controls}
        className={`marquee absolute whitespace-nowrap ${partnerRow.direction}`}
      >
        {[...Array(100)].map((e, i) => (
          <span className="iteration" key={i}>
            {partnerRow.partners.map((partner, index) => (
              <span key={index} className={`partner-wordmark px-3 transition-colors duration-1000 ease-in-out ${partner.fontClassName}`}>
                {partner.text}
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

PartnerRow.propTypes = {
  direction: PropTypes.string,
  partners: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      fontClassName: PropTypes.string,
    })
  ),
};

export default PartnerRow;
