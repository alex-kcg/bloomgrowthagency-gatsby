import React from "react";
import PropTypes from "prop-types";
import SplitTextOnWordBoundaries from "./SplitTextOnWordBoundaries";

const OrderedListItem = ({ image, heading, text }) => {
  return (
    <li className="w-full max-w-sm mx-auto md:max-w-none md:h-[27.5rem] md:transition-opacity md:duration-300 md:ease-out">
      <img src={image} class="block w-full md:hidden" />
      <span className="block text-2xl leading-tighter font-light md:text-5xl md:leading-tighter">
        <SplitTextOnWordBoundaries text={heading} />
      </span>
      <hr className="mt-4 mb-6 border-slate max-w-full md:transition-all md:duration-500 md:ease-out md:mt-4 md:mb-8 md:delay-300" />
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
