import React from "react";
import settings from "../data/settings.yml"
import PropTypes from "prop-types";

const Footer = ({ className }) => {
  return (
    <footer className={className}>
      <ul className="text-electric-lime flex flex-wrap space-x-4 leading-relaxed mt-6 mb-10 md:mb-14">
        {settings.footer.socialMediaLinks && settings.footer.socialMediaLinks.length > 0 && settings.footer.socialMediaLinks.map((data, index) => {
          return <li key={`footer_social_${index}`}>
            <a href={data.url} className="underline-animate" target={data.targetBlank && '_blank'}>
              {data.text}
            </a>
          </li>
        })}
      </ul>
      <nav className="text-gray text-xs font-light flex flex-wrap space-x-4 mb-2">
        {settings.footer.navLinks && settings.footer.navLinks.length > 0 && settings.footer.navLinks.map((data, index) => {
          return <a href={data.url} target={data.targetBlank && '_blank'} className="underline transition-color duration-300 ease-out hover:text-white" key={`footer_nav_${index}`}>
            {data.text}
          </a>
        })}
      </nav>
      <p className="text-gray text-xs font-light">
        {settings.footer.signoff}
      </p>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
