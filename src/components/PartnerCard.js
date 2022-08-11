import * as React from "react";
import PropTypes from "prop-types";

const PartnerCard = ({
  className,
  heading,
  bulletColorClassName,
  bullets,
  description,
  logo,
}) => {
  return (
    <a href="#" className={`block group backdrop-blur-3xl w-full px-8 py-12 rounded-3xl border border-gray border-opacity-[0.08] text-cream font-light text-lg leading-normal ${className ? className : ''}`}>
      <header className="relative">
        <div className="h-23 flex justify-start items-center" dangerouslySetInnerHTML={{ __html: logo }} />
        <h3 className="sr-only">
          {heading}
        </h3>
        {bullets && bullets.length > 0 &&
          <ul className="flex flex-wrap">
            {bullets.map((bullet, index) => (
              <li key={index}>
                {bullet}
                {index + 1 < bullets.length &&
                  <span className={`inline-block align-middle h-2 w-2 rounded-full mx-4 ${bulletColorClassName ? bulletColorClassName : ''}`} />
                }
              </li>
            ))}
          </ul>
        }
      </header>
      <p className="bg-inner-animate relative mt-8 pt-8 border-t border-cream">
        {description}
      </p>
    </a>
  );
};

PartnerCard.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string,
  bulletColorClassName: PropTypes.string,
  bullets: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  logo: PropTypes.string
};

export default PartnerCard;
