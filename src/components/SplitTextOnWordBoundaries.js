import React from "react";
import PropTypes from "prop-types";

const SplitTextOnWordBoundaries = ({ className, text, delay = 0 }) => {
  return (
    <>
      <span className={`animate-words leading-none ${className ? className : ''}`}>
        {text.split(' ').map((text, index) => (
          <React.Fragment key={index}>
            <span className="animate-word-wrapper inline-block align-top overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <span className="animate-word inline-block transition-all ease-out duration-500 transform-gpu">
                {text.match(/\w+|\s+|[^\s\w]+/g).map((text, index) => (<span key={index}>{text}</span>))}
              </span>
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
