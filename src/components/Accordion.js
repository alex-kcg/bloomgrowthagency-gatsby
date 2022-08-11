import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({ accordionItem }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <li className="border-b border-slate overflow-hidden">
      <motion.h3
        initial={false}
        onClick={() => setExpanded(expanded ? false : true)}
        className="relative font-serif font-light tracking-snug text-3xl py-6 pr-16 cursor-pointer md:text-6xl"
      >
        <span className="bg-animate bg-animate-electric-lime hover:text-not-dark-blue">
          <span className="relative">
            {accordionItem.heading}
          </span>
        </span>
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-cream border border-slate rounded-full bg-animate bg-animate-electric-lime hover:border-not-dark-blue hover:text-not-dark-blue">
          <svg className="relative h-10 w-10" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={`fill-current ${expanded ? 'hidden' : ''}`} fillRule="evenodd" clipRule="evenodd" d="M20.4285 14.8571C20.4285 14.3838 20.2367 14 20 14C19.7633 14 19.5714 14.3838 19.5714 14.8571V19.1428H14.8571C14.3838 19.1428 14 19.3347 14 19.5713C14 19.808 14.3838 19.9999 14.8571 19.9999H19.5714V25.1429C19.5714 25.6162 19.7633 26 20 26C20.2367 26 20.4285 25.6162 20.4285 25.1429V19.9999H25.1429C25.6162 19.9999 26 19.808 26 19.5713C26 19.3347 25.6162 19.1428 25.1429 19.1428H20.4285V14.8571Z" />
            <path className={`fill-current ${expanded ? '' : 'hidden'}`} fillRule="evenodd" clipRule="evenodd" d="M26 19.5C26 19.7761 25.6162 20 25.1429 20L14.8571 20C14.3838 20 14 19.7761 14 19.5C14 19.2239 14.3838 19 14.8571 19L25.1429 19C25.6162 19 26 19.2239 26 19.5Z" />
          </svg>
        </button>
      </motion.h3>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="pb-6 text-base font-light leading-relaxed max-w-[37.5rem] md:text-lg">
              {accordionItem.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

Accordion.propTypes = {
  accordionItem: PropTypes.shape({
    heading: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default Accordion;
