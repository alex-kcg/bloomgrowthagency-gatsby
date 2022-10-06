import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

// eslint-disable-next-line
export const LegalPageTemplate = ({
  cmsPreview,
  title,
  description,
  html
}) => {
  return (
    <main className={`legal-template ${cmsPreview && 'cms-preview'}`}>
      <header className="navbar-container z-50 w-full">
        <Navbar useLink={true} />
      </header>
      <section className="relative z-20 container mx-auto px-4 py-30 md:py-48">
        <h1 className="font-serif font-light tracking-snug text-4xl mb-20 md:text-8xl">
          {title}
        </h1>
        <div className="prose prose-cream max-w-full" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </main>
  );
};

LegalPageTemplate.propTypes = {
  cmsPreview: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string
};

const LegalPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout>
      <LegalPageTemplate
        cmsPreview={false}
        title={frontmatter.title}
        description={frontmatter.description}
        html={html}
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
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
