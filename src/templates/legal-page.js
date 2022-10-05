import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import settings from "../data/settings.yml"
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

// eslint-disable-next-line
export const LegalPageTemplate = ({
  cmsPreview,
  title,
  description,
  body
}) => {
  return (
    <main className={`${cmsPreview && 'cms-preview'}`}>
      <header className="navbar-container w-full z-50 py-8 text-center transition-all duration-500 ease-in-out md:pointer-events-none md:py-16">
        <Navbar />
      </header>
      <section className="relative z-20" dangerouslySetInnerHTML={{ __html: body}} />
    </main>
  );
};

LegalPageTemplate.propTypes = {
  cmsPreview: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string
};

const LegalPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <LegalPageTemplate
        cmsPreview={false}
        title={frontmatter.title}
        description={frontmatter.description}
        body={frontmatter.body}
      />
    </Layout>
  );
};

LegalPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default LegalPage;

export const pageQuery = graphql`
  query LegalPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "legal-page" } }) {
      html
      frontmatter {
        title
        description
        body
      }
    }
  }
`;
