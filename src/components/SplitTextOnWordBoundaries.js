import React from "react";
import PropTypes from "prop-types";

const SplitTextOnWordBoundaries = ({ className, text, link }) => {
  return (
    <>
      <span className={`animate-words leading-none ${className ? className : ''}`}>
        {text && text.split(' ').length > 0 && text.split(' ').map((text, index) => (
          <React.Fragment key={index}>
            <span className="animate-word-wrapper inline-block align-top overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <span className="animate-word inline-block transition-all ease-out duration-500 transform-gpu">
                {text && text.match(/\w+|\s+|[^\s\w]+/g) && text.match(/\w+|\s+|[^\s\w]+/g).map((text, index) => (<span key={index}>{text}</span>))}
              </span>
            </span>
            {' '}
          </React.Fragment>
        ))}
        {(link && link.href && link.text) && (
          <span className="animate-word-wrapper inline-block align-top overflow-hidden pb-[0.1em] -mb-[0.1em]">
            <span className="animate-word inline-block transition-all ease-out duration-500 transform-gpu">
              <a href={link.href} className="transition-colors duration-300 ease-out underline hover:text-electric-lime">
                {link.text}
              </a>
            </span>
          </span>
        )}
      </span>
    </>
  );
};

SplitTextOnWordBoundaries.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.object,
};

export default SplitTextOnWordBoundaries;
