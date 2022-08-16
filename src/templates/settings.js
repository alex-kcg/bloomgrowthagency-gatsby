import React from "react";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// eslint-disable-next-line
export const SettingsTemplate = ({}) => {
  return (

    <div className="min-h-screen flex flex-col justify-between items-stretch">
      <div className="fixed z-50 top-0 left-1/2 transform -translate-x-1/2 py-8 text-center md:py-16">
        <Navbar />
      </div>
      <Footer />
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
