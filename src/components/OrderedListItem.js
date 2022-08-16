import React from "react";
import PropTypes from "prop-types";
import SplitTextOnWordBoundaries from "./SplitTextOnWordBoundaries";

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
        <SplitTextOnWordBoundaries text={index} />
      </span>
      <motion.hr
        initial={{ width: '100%' }}
        whileInView={{ width: '100%' }}
        className="my-6 border-slate md:my-8"
      />
      <SplitTextOnWordBoundaries text={text} />
    </motion.li>
  );
};

OrderedListItem.propTypes = {
  index: PropTypes.string,
  text: PropTypes.string,
};

export default OrderedListItem;
