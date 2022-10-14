import React from "react";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// eslint-disable-next-line
export const SettingsTemplate = ({}) => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-stretch">
      <header className="navbar-container z-50 w-full">
        <Navbar />
      </header>
      <Footer className="container mx-auto px-4 pb-20 mt-auto" />
    </div>
  );
};

SettingsTemplate.propTypes = {};

const Settings = ({ data }) => {
  return (
    <SettingsTemplate />
  );
};

Settings.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default Settings;
