import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            siteTitle
            siteDescription
          }
        }
      }
    `
  )
  return site.siteMetadata
}

export default useSiteMetadata
