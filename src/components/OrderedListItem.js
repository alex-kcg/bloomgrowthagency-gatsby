import React from "react";
import PropTypes from "prop-types";
import SplitTextOnWordBoundaries from "./SplitTextOnWordBoundaries";

const OrderedListItem = ({ image, heading, text }) => {
  return (
    <li className="w-full max-w-sm mx-auto md:max-w-none md:h-[27.5rem] md:transition-opacity md:duration-300 md:ease-out">
      <img src={image} className="fixed z-10 bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm block w-full pointer-events-none transition-opacity duration-150 opacity-0 hidden" />
      <span className="block font-serif tracking-tighter font-light text-4xl md:text-6xl">
        <SplitTextOnWordBoundaries text={heading} />
      </span>
      <hr className="mt-4 mb-6 border-slate max-w-full md:transition-all md:duration-500 md:ease-out md:delay-300" />
      <SplitTextOnWordBoundaries text={text} />
    </li>
  );
};

OrderedListItem.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  text: PropTypes.string,
};

export default OrderedListItem;
