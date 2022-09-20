import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({ accordionItem }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <li className="border-b border-slate overflow-hidden mb-2">
      <motion.h3
        initial={false}
        className="relative group cursor-pointer font-serif font-light tracking-snug text-3xl py-6 pr-16 md:text-5xl"
        onClick={() => setExpanded(expanded ? false : true)}
      >
        <span
          className={`bg-animate group-bg-animate bg-animate-electric-lime ${accordionItem.newtype ? 'group-bg-animate-in-out' : 'transition-colors duration-500 md:group-hover:text-not-dark-blue'}`}
        >
          <span className="relative">
            {accordionItem.heading}
          </span>
        </span>
        <button
          className={`absolute right-0 top-1/2 h-10 w-10 transform -translate-y-1/2 text-cream border border-slate rounded-full bg-animate group-bg-animate bg-animate-electric-lime  ${accordionItem.newtype ? 'group-bg-animate-in-out' : 'md:group-hover:border-not-dark-blue md:group-hover:text-not-dark-blue'}`}
        >
          <svg className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 origin-center transition-transform ease-out duration-500 ${expanded ? 'rotate-180' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={`fill-current ${expanded ? '' : ''}`} d="M6.75 1C6.75 0.585786 6.41421 0.25 6 0.25C5.58579 0.25 5.25 0.585786 5.25 1V5.25H1C0.585787 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585787 6.75 1 6.75H5.25V11C5.25 11.4142 5.58579 11.75 6 11.75C6.41421 11.75 6.75 11.4142 6.75 11V6.75H11C11.4142 6.75 11.75 6.41421 11.75 6C11.75 5.58579 11.4142 5.25 11 5.25H6.75V1Z" fill="#F8F7F3"/>
          </svg>
          <svg className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 origin-center transition-transform ease-out duration-500 ${expanded ? 'rotate-180' : '-rotate-90'}`} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={`fill-current ${expanded ? '' : ''}`} d="M6.75 1C6.75 0.585786 6.41421 0.25 6 0.25C5.58579 0.25 5.25 0.585786 5.25 1V5.25H1C0.585787 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585787 6.75 1 6.75H5.25V11C5.25 11.4142 5.58579 11.75 6 11.75C6.41421 11.75 6.75 11.4142 6.75 11V6.75H11C11.4142 6.75 11.75 6.41421 11.75 6C11.75 5.58579 11.4142 5.25 11 5.25H6.75V1Z" fill="#F8F7F3"/>
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
            <p className="pb-6 text-base text-gray font-light leading-relaxed max-w-[37.5rem] md:text-lg">
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
    newtype: PropTypes.bool,
    heading: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default Accordion;
