import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const OrderedListItem = ({ text }) => {
  return (
    <motion.li
      initial={{ opacity: 0.5, color: '#bebebe' }}
      whileInView={{ opacity: 1, color: '#f8f7f3' }}
      viewport={{ margin: '-50%' }}
      className="w-full"
    >
      {text}
    </motion.li>
  );
};

OrderedListItem.propTypes = {
  text: PropTypes.string,
};

export default OrderedListItem;
