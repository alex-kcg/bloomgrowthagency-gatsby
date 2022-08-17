import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const SplitTextOnWordBoundaries = ({ className, text, delay = 0 }) => {
  return (
    <>
      <span className={className}>
        {text.split(' ').map((text, index) => (
          <React.Fragment key={index}>
            <span
              className="inline-block overflow-hidden transform-gpu origin-top-left"
            >
              <motion.span
                initial={{ opacity: 0, y: '100%', rotateZ: '10deg' }}
                whileInView={{ opacity: 1, y: '0%', rotateZ: '0deg' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: (delay + (index * 0.05)) }}
                viewport={{ once: true }}
                className="inline-block"
              >
                {text.match(/\w+|\s+|[^\s\w]+/g).map((text, index) => (<span key={index}>{text}</span>))}
              </motion.span>
            </span>
            {' '}
          </React.Fragment>
        ))}
      </span>
    </>
  );
};

SplitTextOnWordBoundaries.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  delay: PropTypes.number,
};

export default SplitTextOnWordBoundaries;
