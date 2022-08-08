import React from "react";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// eslint-disable-next-line
export const SettingsTemplate = ({}) => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-stretch">
      <div className="absolute z-50 top-0 inset-x-0 w-full">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <Navbar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

SettingsTemplate.propTypes = {};

const Settings = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

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
