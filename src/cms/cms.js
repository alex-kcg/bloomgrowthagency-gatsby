import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import IndexPagePreview from './preview-templates/IndexPagePreview'
import LegalPagePreview from './preview-templates/LegalPagePreview'
import SettingsPreview from './preview-templates/SettingsPreview'

const markdownWidget = CMS.getWidget('markdown')
if (markdownWidget) {
    CMS.getWidget('markdown').globalStyles = '[data-slate-editor] { -webkit-user-modify: read-write !important; }'
}

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('privacy', LegalPagePreview)
CMS.registerPreviewTemplate('terms', LegalPagePreview)
CMS.registerPreviewTemplate('settings', SettingsPreview)
