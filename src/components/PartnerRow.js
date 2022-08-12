import * as React from "react";
import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";

const { useEffect } = React;

const PartnerRow = ({ partnerRow }) => {
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

  useEffect(() => {
    controls.start(controlParams)
  }, [])

  return (
    <div
      className="relative select-none overflow-hidden mb-4 md:mb-6"
      style={{ height: '1.1667em' }}
    >
      <motion.div
        animate={controls}
        className={`marquee absolute whitespace-nowrap ${partnerRow.direction}`}
        onHoverStart={() => { console.log('pause animation with "controls.stop()"') } }
      >
        {[...Array(100)].map((e, i) => (
          <span className="iteration" key={i}>
            {partnerRow.partners.map((partner, index) => (
              <a key={index} href={partner.url} target="_blank" className={`px-3 transition-colors duration-300 ease-in-out ${partner.colorClassName} ${partner.fontClassName}`}>
                {partner.text}
              </a>
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
      url: PropTypes.string,
      colorClassName: PropTypes.string,
      fontClassName: PropTypes.string,
    })
  ),
};

export default PartnerRow;
