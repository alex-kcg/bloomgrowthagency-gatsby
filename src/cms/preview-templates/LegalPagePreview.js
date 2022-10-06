import React from 'react'
import PropTypes from 'prop-types'
import { LegalPageTemplate } from '../../templates/legal-page'

const LegalPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <LegalPageTemplate
        cmsPreview={true}
        title={data.title}
        description={data.description}
        body={data.body}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

LegalPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default LegalPagePreview
