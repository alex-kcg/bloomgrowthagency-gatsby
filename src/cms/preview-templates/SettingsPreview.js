import React from 'react'
import PropTypes from 'prop-types'
import { SettingsTemplate } from '../../templates/settings'

const Settings = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <SettingsTemplate />
    )
  } else {
    return <div>Loading...</div>
  }
}

Settings.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default Settings
