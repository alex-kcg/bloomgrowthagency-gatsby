import React from "react";
import settings from "../data/settings.yml"

const Navbar = class extends React.Component {
  render() {
    return (
      <nav
        className="navbar pointer-events-none"
        role="navigation"
        aria-label="main-navigation"
      >
        <img src={settings.header.logo.image} alt={settings.header.logo.alt} className="block h-12 w-auto mx-auto pointer-events-auto" />
      </nav>
    );
  }
};

export default Navbar;
