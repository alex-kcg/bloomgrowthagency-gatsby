import * as React from "react";
import PropTypes from "prop-types";

const PartnerCard = ({
  className,
  heading,
  bulletColorClassName,
  bullets,
  description,
  image,
}) => {
  console.log(image);
  return (
    <div className={`block group backdrop-blur-3xl w-full p-8 rounded-3xl border border-gray border-opacity-[0.08] text-cream font-light text-lg leading-8 min-h-[30rem] ${className ? className : ''}`}>
      <header className="relative">
        <div className="h-20 flex justify-start items-center">
          <img className="self-center max-w-full max-h-full object-contain object-center" src={image.image.publicURL ? image.image.publicURL : image.image} alt={image.alt} /> 
        </div>
        <h3 className="sr-only">
          {heading}
        </h3>
        {bullets && bullets.length > 0 &&
          <ul className="flex flex-wrap mt-4">
            {bullets.map((bullet, index) => (
              <li key={index}>
                {bullet}
                {index + 1 < bullets.length &&
                  <span className={`inline-block align-middle h-1 w-1 rounded-full mx-4 ${bulletColorClassName ? bulletColorClassName : ''}`} />
                }
              </li>
            ))}
          </ul>
        }
      </header>
      <p className="bg-inner-animate relative mt-8 pt-8 border-t border-slate">
        {description}
      </p>
    </div>
  );
};

PartnerCard.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string,
  bulletColorClassName: PropTypes.string,
  bullets: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  image: PropTypes.object
};

export default PartnerCard;
