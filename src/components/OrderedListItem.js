import React from "react";
import PropTypes from "prop-types";
import SplitTextOnWordBoundaries from "./SplitTextOnWordBoundaries";

const OrderedListItem = ({ text, index }) => {
  return (
    <li className="w-full md:h-[27.5rem] md:transition-opacity md:duration-300 md:ease-out">
      <span className="block text-7xl font-light leading-[0.72727272em] md:text-10xl md:leading-[0.72727272em]">
        <SplitTextOnWordBoundaries text={index} />
      </span>
      <hr className="my-6 border-slate max-w-full md:transition-all md:duration-500 md:ease-out md:my-8 md:delay-300" />
      <SplitTextOnWordBoundaries text={text} />
    </li>
  );
};

OrderedListItem.propTypes = {
  index: PropTypes.string,
  text: PropTypes.string,
};

export default OrderedListItem;
