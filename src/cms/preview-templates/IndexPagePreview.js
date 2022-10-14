import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <IndexPageTemplate
        cmsPreview={true}
        title={data.title}
        description={data.description}
        heading={data.heading}
        headingAlignment={data.headingAlignment}
        partnerRows={data.partnerRows || []}
        numberedList={data.numberedList || []}
        accordionHeading={data.accordionHeading}
        accordionHeadingAlignment={data.accordionHeadingAlignment}
        accordionItems={data.accordionItems || []}
        partnersHeading={data.partnersHeading}
        partnersHeadingAlignment={data.partnersHeadingAlignment}
        partnersSubheading={data.partnersSubheading}
        partnersSubheadingLink={data.partnersSubheadingLink}
        partnersCards={data.partnersCards || []}
        footerCTAHeading={data.footerCTAHeading}
        footerCTASubheading={data.footerCTASubheading}
        footerCTALink={data.footerCTALink}
        footerContactHeading={data.footerContactHeading}
        footerContactName={data.footerContactName}
        footerContactTitle={data.footerContactTitle}
        footerContactLink={data.footerContactLink}
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
