import * as React from "react";
import settings from "../data/settings.yml"

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer container mx-auto px-4 sm:flex sm:flex-row-reverse sm:items-center text-concrete text-sm w-full mt-auto py-2 sm:py-4">
        <ul className="flex flex-wrap justify-center space-x-3 mb-2 sm:mb-0">
          {settings.footer.socialMediaLinks.map((data, index) => {
            return <li key={`content_item_${index}`}>
              <a className="button button-lime text-concrete block rounded-full overflow-hidden hover:text-ebony" href={data.url} target="_blank">
                {data.type == 'linkedin' &&
                  <svg  className="relative z-10 w-9 h-9 sm:w-12 sm:h-12" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-current" d="M16.3359 21.4424V32H19.6641V21.4424H16.3359ZM25 32H21.6641V23.8284C21.6641 23.8284 21.6094 21.8015 21.6094 21.4424H24.8906L25 22.9027C25.6641 21.8813 26.6641 21.1072 28 21.1072C30.3359 21.1072 32 22.807 32 25.8713V32H28.6641V26.2145C28.6641 24.5067 27.8516 23.8284 26.8516 23.8284C25.8516 23.8284 25 24.5067 25 25.8713V32ZM17.9844 19.7426C19.2188 19.7426 20 18.9127 20 17.8673C19.9844 16.814 19.2188 16 18.0156 16C16.7969 16 16 16.814 16 17.8673C16 18.9127 16.7812 19.7426 17.9609 19.7426H17.9844Z" />
                    <rect className="stroke-lime" x="0.5" y="0.5" width="47" height="47" rx="23.5" />
                  </svg>
                }
              </a>
            </li>
          })}
        </ul>
        <ul className="separated-list flex flex-wrap justify-center space-x-6 mb-4 sm:mb-0 sm:mr-6">
          {settings.footer.locations.map((data, index) => {
            return <li key={`content_item_${index}`}>{data.name}</li>
          })}
        </ul>
        <p className="text-center sm:mr-auto">{settings.footer.signoff}</p>
      </footer>
    );
  }
};

export default Footer;
