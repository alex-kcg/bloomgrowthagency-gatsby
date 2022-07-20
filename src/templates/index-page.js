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
    <div className="w-full">
      <section>
        <div className="container mx-auto px-4 text-center mb-10 md:w-full lg:mb-14">
          <h1 className="font-serif tracking-tight text-4xl mb-6 md:text-8xl lg:mb-10">{heading}</h1>
          <a className="button inline-block text-base text-center overflow-hidden py-4 px-12 rounded-full bg-lime text-ebony" href={button.url}>
            <span className="relative z-10">
              {button.text}
            </span>
          </a>
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
