import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({ accordionItem }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <li className="border-b border-slate overflow-hidden mb-2 md:mb-4">
      <motion.h3
        initial={false}
        onClick={() => setExpanded(expanded ? false : true)}
        className="group relative font-serif font-light tracking-snug text-3xl py-6 pr-16 cursor-pointer md:text-6xl"
      >
        <span className="group-bg-animate bg-animate bg-animate-electric-lime md:group-hover:text-not-dark-blue">
          <span className="relative">
            {accordionItem.heading}
          </span>
        </span>
        <button className="absolute right-0 top-1/2 h-10 w-10 transform -translate-y-1/2 text-cream border border-slate rounded-full group-bg-animate bg-animate bg-animate-electric-lime md:group-hover:border-not-dark-blue md:group-hover:text-not-dark-blue">
          <svg className={`absolute inset-0 h-10 w-10 transform origin-center transition-transform ease-out duration-500 ${expanded ? 'rotate-180' : ''}`} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={`fill-current ${expanded ? '' : ''}`} fillRule="evenodd" clipRule="evenodd" d="M26 19.5C26 19.7761 25.6162 20 25.1429 20L14.8571 20C14.3838 20 14 19.7761 14 19.5C14 19.2239 14.3838 19 14.8571 19L25.1429 19C25.6162 19 26 19.2239 26 19.5Z" />
          </svg>
          <svg className={`absolute inset-0 h-10 w-10 transform origin-center transition-transform ease-out duration-500 ${expanded ? 'rotate-180' : '-rotate-90'}`} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={`fill-current ${expanded ? '' : ''}`} fillRule="evenodd" clipRule="evenodd" d="M26 19.5C26 19.7761 25.6162 20 25.1429 20L14.8571 20C14.3838 20 14 19.7761 14 19.5C14 19.2239 14.3838 19 14.8571 19L25.1429 19C25.6162 19 26 19.2239 26 19.5Z" />
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
