import * as React from "react";
import { Helmet } from "react-helmet";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const TemplateWrapper = ({ pageTitle, pageTitleOverride, pageDescription, children }) => {
  const { siteTitle, siteDescription } = useSiteMetadata();
  return (
    <div className="min-h-screen flex flex-col items-stretch">
      <Helmet>
        <html lang="en" />
        <title>{pageTitleOverride ? pageTitle : `${pageTitle} - ${siteTitle}`}</title>
        <meta name="description" content={pageDescription ? pageDescription : siteDescription} />
        <meta name="theme-color" content="#061014" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitleOverride ? pageTitle : `${pageTitle} - ${siteTitle}`} />
        <meta property="og:description" content={pageDescription ? pageDescription : siteDescription} />
        <meta property="og:url" content={`${withPrefix("/")}`} />
        <meta property="og:image" content={`${withPrefix("/")}img/og-image.jpg`} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="194x194" href="/favicon-194x194.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#071014" />
        <meta name="apple-mobile-web-app-title" content="Bloom Growth" />
        <meta name="application-name" content="Bloom Growth" />
        <meta name="msapplication-TileColor" content="#071014" />
        <meta name="theme-color" content="#d8ff34" />
      </Helmet>
      <div>
        {children}
      </div>
    </div>
  );
};

export default TemplateWrapper;
