import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import IndexPagePreview from './preview-templates/IndexPagePreview'
import LegalPagePreview from './preview-templates/LegalPagePreview'
import SettingsPreview from './preview-templates/SettingsPreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('legal', LegalPagePreview)
CMS.registerPreviewTemplate('settings', SettingsPreview)
