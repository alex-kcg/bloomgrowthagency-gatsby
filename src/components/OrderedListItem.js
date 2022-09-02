import React from "react";
import PropTypes from "prop-types";
import SplitTextOnWordBoundaries from "./SplitTextOnWordBoundaries";

const OrderedListItem = ({ heading, text }) => {
  return (
    <li className="w-full md:h-[27.5rem] md:transition-opacity md:duration-300 md:ease-out">
      <span className="block text-2xl leading-tighter font-light md:text-5xl md:leading-tighter">
        <SplitTextOnWordBoundaries text={heading} />
      </span>
      <hr className="mt-4 mb-6 border-slate max-w-full md:transition-all md:duration-500 md:ease-out md:mt-4 md:mb-8 md:delay-300" />
      <SplitTextOnWordBoundaries text={text} />
    </li>
  );
};

OrderedListItem.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
};

export default OrderedListItem;
