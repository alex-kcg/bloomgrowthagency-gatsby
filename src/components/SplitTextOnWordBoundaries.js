import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const SplitTextOnWordBoundaries = ({ className, text }) => {
  return (
    <span className={className}>
      {text.split(' ').map((text, index) => (
        <motion.span
          key={index}
        >
          {text.match(/\w+|\s+|[^\s\w]+/g).map((text, index) => (<span key={index}>{text}</span>))} </motion.span>
      ))}
    </span>
  );
};

SplitTextOnWordBoundaries.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

export default SplitTextOnWordBoundaries;
