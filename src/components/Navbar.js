import React from "react";
import PropTypes from "prop-types";
import settings from "../data/settings.yml"
import { Link } from "gatsby"

const Navbar = ({ useLink }) => {
  const imageClasses = 'block h-12 w-auto mx-auto pointer-events-auto';

  return (
    <nav
      className="navbar pointer-events-none"
      role="navigation"
      aria-label="main-navigation"
    >
      {useLink && (
        <Link to="/">
          <img src={settings.header.logo.image} alt={settings.header.logo.alt} className={imageClasses} />
        </Link>
      )}
      {!useLink && (
        <img src={settings.header.logo.image} alt={settings.header.logo.alt} className={imageClasses} />
      )}
    </nav>
  );
};

Navbar.propTypes = {
  useLink: PropTypes.bool
};

export default Navbar;
