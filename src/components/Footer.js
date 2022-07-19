import * as React from "react";
import settings from "../data/settings.yml"

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer container mx-auto px-4 lg:flex lg:flex-row-reverse lg:items-center text-concrete text-sm w-full mt-auto py-2 lg:py-4">
        <ul className="flex flex-wrap justify-center space-x-3 mb-2 lg:mb-0">
          {settings.footer.socialMediaLinks.map((data, index) => {
            return <li key={`content_item_${index}`}>
              <a href={data.url} target="_blank">
                <img src={`/img/social-${data.type}.svg`} />
              </a>
            </li>
          })}
        </ul>
        <ul className="separated-list flex flex-wrap justify-center space-x-6 mb-4 lg:mb-0 lg:mr-6">
          {settings.footer.locations.map((data, index) => {
            return <li key={`content_item_${index}`}>{data.name}</li>
          })}
        </ul>
        <p className="text-center lg:mr-auto">{settings.footer.signoff}</p>
      </footer>
    );
  }
};

export default Footer;
