import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import PartnerRow from "../components/PartnerRow";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const { useEffect, useRef } = React;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  gsap.core.globals("ScrollTrigger", ScrollTrigger)
}

// eslint-disable-next-line
export const IndexPageTemplate = ({
  title,
  description,
  heading,
  button,
  partnerRows,
}) => {
  // store a reference to the box div
  const heroBgRef = useRef();

  // wait until DOM has been rendered
  useEffect(() => {
    const html = document.documentElement;
    const canvas = document.getElementById("hero-bg");
    const context = canvas.getContext("2d");

    const frameCount = 181;
    const currentFrame = index => (
      `/img/BG-SiteAnim-PlanterModel-Phase1-v6-frame${index.toString().padStart(4, '0')}.jpg`
    )

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        console.log(img);
        img.src = currentFrame(i);
      }
    };

    const img = new Image()
    img.src = currentFrame(1);
    canvas.width=1440;
    canvas.height=810;
    img.onload=function(){
      context.drawImage(img, 0, 0);
    }

    const updateImage = index => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0);
    }

    window.addEventListener('scroll', () => {  
      const scrollTop = html.scrollTop;
      const maxScrollTop = html.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );
      
      requestAnimationFrame(() => updateImage(frameIndex + 1))
    });

    preloadImages()
  });

  return (
    <div className="w-full h-screen flex justify-center items-center py-44">
      <div className="fixed z-0 inset-0 flex justify-center items-center">
        <canvas id="hero-bg" className="hero-bg aspect-video w-full" ref={heroBgRef} />
      </div>
      <section className="hero-bg-foreground relative z-50">
        <div className="container mx-auto px-4 text-center mb-10 md:w-full lg:mb-14">
          <motion.h1
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.375, ease: 'easeOut', delay: 0.5 }}
            className=" font-serif tracking-tight text-4xl mb-6 md:text-8xl lg:mb-10">
            {heading}
          </motion.h1>
          <motion.a
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.375, ease: 'easeOut', delay: 0.75 }}
            className=" button inline-block text-base text-center overflow-hidden py-4 px-12 rounded-full bg-electric-lime text-not-dark-blue"
            href={button.url}
          >
            <span className="relative z-10">
              {button.text}
            </span>
          </motion.a>
        </div>
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 100, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 1.5 }}
        >
          {partnerRows.map((row, index) => (
            <PartnerRow key={index} partnerRow={row} />
          ))}
        </motion.div>
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
          url: PropTypes.string,
          colorClassName: PropTypes.string,
          fontClassName: PropTypes.string,
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
            url
            colorClassName
            fontClassName
          }
        }
      }
    }
  }
`;
