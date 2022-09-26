import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({ accordionItem }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <li className="border-b border-slate mb-2">
      <motion.h3
        initial={false}
        className="relative group cursor-pointer font-serif font-light tracking-snug text-3xl py-6 pr-16 leading-normal md:text-5xl md:-tracking-1"
        onClick={() => setExpanded(expanded ? false : true)}
      >
        <span className="bg-animate group-bg-animate bg-animate-electric-lime group-bg-animate-in-out transition-colors duration-150 group-active:bg-electric-lime group-active:text-not-dark-blue md:group-active:bg-transparent">
          <span className="relative">
            {accordionItem.heading}
          </span>
        </span>
        <button className="absolute right-0 top-1/2 h-10 w-10 transform -translate-y-1/2 text-cream border border-slate rounded-full bg-animate group-bg-animate transition-colors duration-150 bg-animate-electric-lime group-active:bg-electric-lime group-active:text-not-dark-blue md:bg-transparent md:group-hover:border-not-dark-blue md:group-hover:text-not-dark-blue">
          <svg className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={`fill-current origin-center transition-transform ease-out duration-500 ${expanded ? 'rotate-180' : ''}`} d="M11.25 11.25H7C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75H11.25L12.75 12.75H17C17.4142 12.75 17.75 12.4142 17.75 12C17.75 11.5858 17.4142 11.25 17 11.25H12.75H11.25Z" />
            <path className={`fill-current origin-center transition-transform ease-out duration-500 ${expanded ? 'rotate-180' : '-rotate-90'}`} d="M11.25 11.25H7C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75H11.25L12.75 12.75H17C17.4142 12.75 17.75 12.4142 17.75 12C17.75 11.5858 17.4142 11.25 17 11.25H12.75H11.25Z" />
          </svg>
        </button>
      </motion.h3>
      <div className="overflow-hidden">
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
      </div>
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
