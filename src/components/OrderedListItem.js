import React from "react";
import PropTypes from "prop-types";
import SplitTextOnWordBoundaries from "./SplitTextOnWordBoundaries";

const OrderedListItem = ({ image, heading, text }) => {
  return (
    <li className="w-full max-w-sm mx-auto md:max-w-none md:h-[27.5rem] md:transition-opacity md:duration-300 md:ease-out">
      <div className="fixed-image fixed z-10 bottom-0 inset-x-0 w-full pointer-events-none transition-opacity ease-in-out duration-300 opacity-0 md:hidden">
        <img src={image.image.publicURL} alt={image.alt} className="mobile-preload relative z-20 block w-full max-w-sm mx-auto" />
      </div>
      <span className="block font-serif tracking-snug font-light text-4xl md:text-6xl md:-tracking-1">
        <SplitTextOnWordBoundaries text={heading} />
      </span>
      <hr className="mt-4 mb-6 border-slate max-w-full md:transition-all md:duration-500 md:ease-out md:delay-300" />
      <SplitTextOnWordBoundaries text={text} />
    </li>
  );
};

OrderedListItem.propTypes = {
  image: PropTypes.object,
  heading: PropTypes.string,
  text: PropTypes.string,
};

export default OrderedListItem;
