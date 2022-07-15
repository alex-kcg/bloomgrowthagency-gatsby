import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PartnerRow from "../components/PartnerRow";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  title,
  description,
  heading,
  button,
  partnerRows,
}) => {
  return (
    <div>
      <section>
        <div className="text-center max-w-xs mx-auto mb-6 lg:max-w-3xl lg:mb-10">
          <h1 className="font-serif tracking-tight text-4xl lg:text-5xl mb-6 lg:mb-10">{heading}</h1>
          <a className="inline-block text-base py-4 px-12 rounded-full text-deep-sea bg-lime" href={button.url}>{button.text}</a>
        </div>
        {partnerRows.map((row, index) => (
          <PartnerRow key={index} partnerRow={row} />
        ))}
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  heading: PropTypes.string,
  button: PropTypes.object,
  partnerRows: PropTypes.arrayOf(
    PropTypes.shape({
      direction: PropTypes.string,
      partners: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        })
      ),
    }),
  ),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        heading={frontmatter.heading}
        button={frontmatter.button}
        partnerRows={frontmatter.partnerRows}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        description
        heading
        button {
          text
          url
        }
        partnerRows {
          direction
          partners {
            text
          }
        }
      }
    }
  }
`;
