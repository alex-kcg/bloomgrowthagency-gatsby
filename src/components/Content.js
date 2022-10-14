import React from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'

const encodeMarkdownURIs = (source = '') => {
  const markdownLinkRegex = /\[(.+)\]\((.+)(".+)\)/g
  return source.replace(markdownLinkRegex, (match, linkURI) => {
    if (!linkURI) return match
    const replaced = match.replace(linkURI, encodeURI(linkURI))
    return replaced
  })
}

const Content = ({ source, src, className = '' }) => {
  // accepts either html or markdown
  source = source || src || ''

  return (
    <ReactMarkdown className={className}>
      {encodeMarkdownURIs(source)}
    </ReactMarkdown>
  )
}

Content.propTypes = {
  source: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string
}

export default Content