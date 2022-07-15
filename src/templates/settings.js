import React from "react";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// eslint-disable-next-line
export const SettingsTemplate = ({}) => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-stretch">
      <Navbar />
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
