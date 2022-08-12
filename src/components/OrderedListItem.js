import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const OrderedListItem = ({ text, index }) => {
  return (
    <motion.li
      initial={{ opacity: 0.5, color: '#bebebe' }}
      whileInView={{ opacity: 1, color: '#f8f7f3' }}
      viewport={{ margin: '-50%' }}
      className="w-full"
    >
      <span className="block text-7xl font-light leading-[0.72727272em] md:text-10xl md:leading-[0.72727272em]">
        {index}
      </span>
      <motion.hr
        initial={{ width: '100%' }}
        whileInView={{ width: '100%' }}
        className="my-6 border-gray md:my-8"
      />
      {text.split(' ').map((text, index) => (
        <motion.span
          key={index}
        >
          {text.match(/\w+|\s+|[^\s\w]+/g).map((text, index) => (<span key={index}>{text}</span>))} </motion.span>
      ))}
    </motion.li>
  );
};

OrderedListItem.propTypes = {
  index: PropTypes.string,
  text: PropTypes.string,
};

export default OrderedListItem;
