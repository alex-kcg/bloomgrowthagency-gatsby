import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <IndexPageTemplate
        title={data.title}
        description={data.description}
        heading={data.heading}
        partnerRows={data.partnerRows || []}
        numberedList={data.numberedList || []}
        accordionHeading={data.accordionHeading}
        accordionItems={data.accordionItems || []}
        partnersHeading={data.partnersHeading}
        partnersSubheading={data.partnersSubheading}
        partnersCards={data.partnersCards || []}
        footerCTAHeading={data.footerCTAHeading}
        footerCTASubheading={data.footerCTASubheading}
        footerCTALink={data.footerCTALink}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
