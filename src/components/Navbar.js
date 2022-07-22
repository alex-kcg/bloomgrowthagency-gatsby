import React from "react";
import { Link } from "gatsby";
import settings from "../data/settings.yml"

const Navbar = class extends React.Component {
  render() {
    return (
      <nav
        className="navbar top-0 inset-x-0 bg-ebony w-full"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container mx-auto px-4 py-8 md:py-16">
          <Link to="/" title="Logo">
            <img src={settings.header.logo.image} alt={settings.header.logo.alt} className="block mx-auto" style={{ width: "118px", height: "48px" }} />
          </Link>
        </div>
      </nav>
    );
  }
};

export default Navbar;
