import React from "react";
import PropTypes from "prop-types";

const SplitTextOnWordBoundaries = ({ className, text, delay = 0 }) => {
  return (
    <>
      <span className={`animate-words ${className ? className : ''}`}>
        {text.split(' ').map((text, index) => (
          <React.Fragment key={index}>
            <span className="animate-word-wrapper inline-block overflow-hidden transform-gpu origin-top-left">
              <span className="animate-word inline-block transition-all ease-out duration-500 transform">
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
