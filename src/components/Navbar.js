import React from "react";
import { Link } from "gatsby";
import settings from "../data/settings.yml"
import { motion } from "framer-motion";

const Navbar = class extends React.Component {
  render() {
    return (
      <nav
        className="navbar absolute z-50 top-0 inset-x-0 w-full"
        role="navigation"
        aria-label="main-navigation"
      >
        <motion.div
          animate={{ rotateX: 0, opacity: 1 }}
          initial={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="container mx-auto px-4 py-8 md:py-16"
        >
          <Link to="/" title="Logo">
            <img src={settings.header.logo.image} alt={settings.header.logo.alt} className="block mx-auto" style={{ width: "118px", height: "48px" }} />
          </Link>
        </motion.div>
      </nav>
    );
  }
};

export default Navbar;
