import React from "react";
import { Link } from "gatsby";
import settings from "../data/settings.yml"
import { motion } from "framer-motion";

const Navbar = class extends React.Component {
  render() {
    return (
      <motion.nav
        className="navbar"
        role="navigation"
        aria-label="main-navigation"
        animate={{ rotateX: 0, opacity: 1 }}
        initial={{ rotateX: 90, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 1 }}
      >
        <Link to="/" title="Logo">
          <img src={settings.header.logo.image} alt={settings.header.logo.alt} className="block h-12 w-auto mx-auto" />
        </Link>
      </motion.nav>
    );
  }
};

export default Navbar;
