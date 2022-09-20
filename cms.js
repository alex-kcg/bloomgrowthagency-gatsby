import CMS from 'netlify-cms-app'

const config =
  process.env.NODE_ENV === 'development'
    ? { local_backend: { url: 'http://localhost:8000/api/v1' } }
    : {
        backend: {
          name: 'git-gateway',
          branch: process.env.GATSBY_BRANCH || 'master',
        },
      }

CMS.init({ config })