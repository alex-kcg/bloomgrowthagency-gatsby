import * as React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { motion } from "framer-motion";
import settings from "../data/settings.yml"
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import PartnerRow from "../components/PartnerRow";
import Accordion from "../components/Accordion";
import PartnerCard from "../components/PartnerCard";
import OrderedListItem from "../components/OrderedListItem";
import SplitTextOnWordBoundaries from "../components/SplitTextOnWordBoundaries";
import arrowIcon from "../img/arrow.svg"

const { useEffect, useRef } = React;

// eslint-disable-next-line
export const IndexPageTemplate = ({
  title,
  description,
  heading,
  partnerRows,
  numberedList,
  accordionHeading,
  accordionItems,
  partnersHeading,
  partnersSubheading,
  partnersCards,
  footerCTAHeading,
  footerCTASubheading,
  footerCTALink,
}) => {
  const sectionOneContainer = useRef(null);
  const sectionOneCanvas = useRef(null);

  const sectionTwoContainer = useRef(null);
  const sectionTwoCanvas = useRef(null);
  const sectionTwoOrderedListWrapper = useRef(null);
  const sectionTwoOrderedList = useRef(null);
  
  const sectionThreeContainer = useRef(null);
  const sectionThreeForeground = useRef(null);

  const sectionFourContainer = useRef(null);
  const sectionFourCanvas = useRef(null);

  const sectionFiveContainer = useRef(null);
  const sectionFiveVideo = useRef(null);

  useEffect(() => {
    const body = document.body;
    let sectionOneSequencesLoaded = false;
    let runSectionOneSequence = false;
    let sectionOneFirstTimeoutFailed = false;

    // Prevent scrolling until images are done caching
    body.classList.add('loaded');
    body.classList.add('md:overflow-hidden');

    window.onbeforeunload = function () {
      // Scroll to the top
      window.scrollTo(0, 0);
    }

    // Function to setup canvas 
    const setupCanvasContext = (canvas, canvasWidth, canvasHeight) => {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      return canvas.getContext('2d');
    };

    const sectionOneAnimateWords = sectionOneContainer.current.querySelectorAll('.animate-words');
    const sectionOneContext = setupCanvasContext(sectionOneCanvas.current, 1440, 810);
    const sectionOneFilename = 'BG-SiteAnim-PlanterModel-Phase1-v9-frame_DeMain_';
    const sectionOneFrameCount = 120;
    const sectionOneLoopCount = 21;
    const sectionOneLoopSpeedInterval = 60;
    const sectionOnePlaybackSpeedInterval = 40;
    const sectionOneImage = new Image();
    let sectionOneActive = true;
    let sectionOneIndex = -1;

    const sectionTwoContext = setupCanvasContext(sectionTwoCanvas.current, 1440, 810);
    const sectionTwoFilename = 'BG-SiteAnim-PlanterModel-Phase2-v8-frame_DeMain_';
    const sectionTwoFrameCount = 120;
    let sectionTwoIndex = 0;

    const sectionThreeAnimateWords = sectionThreeContainer.current.querySelectorAll('.animate-words');
    const sectionThreeAccordionContainer = sectionThreeContainer.current.querySelector('.accordion-container');

    const sectionFourAnimateWords = sectionFourContainer.current.querySelectorAll('.animate-words');
    const sectionFourContext = setupCanvasContext(sectionFourCanvas.current, 960, 960);
    const sectionFourFilename = 'Phase4-v9-frame_DeMain_';
    const sectionFourFrameCount = 50;
    const sectionFourLoopCount = 21;
    const sectionFourLoopSpeedInterval = 50;
    let sectionFourActive = false;
    let sectionFourLoopOutroActive = false;
    let sectionFourIndex = 0;

    const sectionFiveAnimateHeadings = sectionFiveContainer.current.querySelectorAll('.animate-words-heading .animate-words');
    const sectionFiveAnimateParagraphs = sectionFiveContainer.current.querySelectorAll('.animate-words-paragraph .animate-words');
    const sectionFiveAnimateWords = sectionFiveContainer.current.querySelectorAll('.animate-words');
    const sectionFiveFadeIn = sectionFiveContainer.current.querySelectorAll('.fade-in');
    const sectionFiveFooter = sectionFiveContainer.current.querySelectorAll('.fade-in-footer');
    const sectionFiveHorizontalRules = sectionFiveContainer.current.querySelectorAll('hr');
    let sectionFiveActive = false;

    const mobileScrollAnimationOffset = 300;

    let imagesPhaseOne = {};
    let imagesPhaseTwo = {};

    // Function to check if is mobile layout
    const isMobile = () => {
      return window.innerWidth < 1000;
    };

    // Function that returns path for image
    const currentFrame = (filename, index, fileformat = 'jpg') => (
      `/img/${filename}${index.toString().padStart(4, '0')}.${fileformat}`
    );

    // Async function to cache images
    const cacheImages = async (images) => {
      const promises = await Object.keys(images).map((key, index) => {
        return new Promise(function (resolve, reject) {
          images[key].src = key;
          images[key].onload = resolve();
          images[key].onerror = reject();
        })
      })

      await Promise.all(promises);
    };

    // Push phase one images to array to prepare for caching
    for (let i = 0; i < sectionOneFrameCount; i++) {
      imagesPhaseOne[currentFrame(sectionOneFilename, i)] = new Image();
    }
    for (let i = 0; i < sectionTwoFrameCount; i++) {
      imagesPhaseTwo[currentFrame(sectionTwoFilename, i)] = new Image();
    }
    for (let i = 0; i < sectionFourFrameCount; i++) {
      imagesPhaseTwo[currentFrame(sectionFourFilename, i)] = new Image();
    }

    // Section One start
    const updateSectionOneImage = () => {
      const image = imagesPhaseOne[currentFrame(sectionOneFilename, sectionOneIndex)];
      if (image) {
        sectionOneContext.drawImage(image, 0, 0);
      }
    }

    const sectionOneLoopOutroSequence = () => {
      for (let i = 0; i < sectionOneLoopCount; i++) {
        (function(index) {
          setTimeout(function() {
            const lastIndex = sectionOneIndex;
            sectionOneIndex = sectionOneFrameCount - sectionOneLoopCount + index + 1;

            if (sectionOneActive && lastIndex !== sectionOneIndex) {
              requestAnimationFrame(() => updateSectionOneImage())
            }

            if ((index + 1) === sectionOneLoopCount) {
              sectionOneLoopOutroSequence()
            }
          }, sectionOneLoopSpeedInterval * (index + 1)) 
        })(i);
      }
    }

    const sectionOnePlaySequence = () => {
      for (let i = sectionOneLoopCount; i < sectionOneFrameCount; i++) {
        (function(index) {
          setTimeout(function() {
            const lastIndex = sectionOneIndex;
            sectionOneIndex = index + 1;

            if (lastIndex !== sectionOneIndex) {
              requestAnimationFrame(() => updateSectionOneImage())
            }

            if ((index + 1) == sectionOneFrameCount) {
              sectionOneLoopOutroSequence();
            }
          }, sectionOnePlaybackSpeedInterval * (index - sectionOneLoopCount + 1))
        })(i);
      }
    }

    const sectionOneLoopIntroSequence = () => {
      for (let i = 0; i < sectionOneLoopCount; i++) {
        (function(index) {
          setTimeout(function() {
            const lastIndex = sectionOneIndex;
            sectionOneIndex = index;

            if (lastIndex !== sectionOneIndex) {
              requestAnimationFrame(() => updateSectionOneImage())
            }

            if ((index + 1) === sectionOneLoopCount) {
              if (runSectionOneSequence) {
                sectionOnePlaySequence();
              } else {
                sectionOneLoopIntroSequence();
              }
            }
          }, sectionOneLoopSpeedInterval * (index))
        })(i);
      }
    }

    const initSectionOne = () => {
      runSectionOneSequence = true;
      body.classList.add('navbar-shadow');

      setTimeout(() => {
        sectionOneAnimateWords.forEach((el) => {
          el.classList.add('active');
        });
      }, 500);
    }

    if (isMobile()) {
      setTimeout(() => {
        sectionOneAnimateWords.forEach((el) => {
          el.classList.add('active');
        });
      }, 1500);
    } else {
      setTimeout(() => {
        if (sectionOneSequencesLoaded) {
          initSectionOne();
        } else {
          sectionOneFirstTimeoutFailed = true;
        }
      }, 3000);
    }

    // Render the first frame while caching
    sectionOneImage.src = currentFrame(sectionOneFilename, 1);
    sectionOneImage.onload = function(){
      sectionOneContext.drawImage(sectionOneImage, 0, 0);
    }

    cacheImages(imagesPhaseOne).then(() => {
      sectionOneSequencesLoaded = true;
      body.classList.remove('md:overflow-hidden');
      sectionOneLoopIntroSequence();

      if (sectionOneFirstTimeoutFailed) {
        initSectionOne();
      }

      cacheImages(imagesPhaseTwo);
    }).catch((err) => console.error(err));

    // Section Two start
    const updateSectionTwoImage = index => {
      const lastIndex = sectionTwoIndex;
      sectionTwoIndex = index;

      if (lastIndex !== sectionTwoIndex) {
        const image = imagesPhaseTwo[currentFrame(sectionTwoFilename, sectionTwoIndex)];

        if (image) {
          sectionTwoContext.drawImage(image, 0, 0);
        }
      }
    }

    // Section Four start
    const updateSectionFourImage = index => {
      const lastIndex = sectionFourIndex;
      sectionFourIndex = index;

      if (lastIndex !== sectionFourIndex) {
        const image = imagesPhaseTwo[currentFrame(sectionFourFilename, sectionFourIndex)]

        if (image) {
          sectionFourContext.drawImage(image, 0, 0);
        }
      }
    }

    function sectionFourLoopOutroSequence () {
      if (sectionFourActive && sectionFourLoopOutroActive) {
        let index = sectionFourIndex + 1;

        if (index > sectionFourFrameCount) {
          index = sectionFourFrameCount - sectionFourLoopCount;
        }

        requestAnimationFrame(() => updateSectionFourImage(index));
      }
    }

    setInterval(sectionFourLoopOutroSequence, sectionFourLoopSpeedInterval);

    window.addEventListener('scroll', () => {
      if (isMobile()) {
        // Section Two
        const sectionTwoContainerScrollTop = window.innerHeight - sectionTwoContainer.current.getBoundingClientRect().top;
        const sectionTwoContainerScrollBottom = sectionTwoContainer.current.getBoundingClientRect().top;
        const sectionTwoMaxScrollTop = sectionTwoContainer.current.scrollHeight + (window.innerHeight / 2);
        const sectionTwoScrollFraction = sectionTwoContainerScrollTop / sectionTwoMaxScrollTop;

        sectionTwoContainer.current.classList.remove('md:pointer-events-none');

        if (sectionTwoContainerScrollTop > mobileScrollAnimationOffset) {
          sectionTwoOrderedList.current.classList.add('mobile-active');
        } else {
          sectionTwoOrderedList.current.classList.remove('mobile-active');
        }


        if (sectionTwoScrollFraction > 1) {
          sectionTwoContainer.current.classList.add('opacity-0');
        } else {
          sectionTwoContainer.current.classList.remove('opacity-0');
        }
        
        sectionTwoOrderedList.current.querySelectorAll('li').forEach((el) => {
          const liScrollTop = window.innerHeight - el.getBoundingClientRect().top;
          const img = el.querySelector('.fixed-image');

          if (liScrollTop > mobileScrollAnimationOffset) {
            if (img) {
              img.classList.remove('opacity-0');
            }

            el.querySelectorAll('.animate-words').forEach((el) => {
              el.classList.add('active');
            });
          } else {
            if (img) {
              img.classList.add('opacity-0');
            }

            el.querySelectorAll('.animate-words').forEach((el) => {
              el.classList.remove('active');
            });
          }
        });

        // Section Three
        const sectionThreeContainerScrollTop = window.innerHeight - sectionThreeContainer.current.getBoundingClientRect().top;
        const sectionThreeMaxScrollTop = (window.innerHeight / 2) + sectionThreeContainer.current.scrollHeight;
        const sectionThreeScrollFraction = sectionThreeContainerScrollTop / sectionThreeMaxScrollTop;

        sectionThreeForeground.current.classList.remove('md:scale-50');

        if (sectionThreeContainerScrollTop > mobileScrollAnimationOffset && sectionThreeScrollFraction < 1) {
          sectionThreeAnimateWords.forEach((el) => {
            el.classList.add('active');
          });
        } else {
          sectionThreeAnimateWords.forEach((el) => {
            el.classList.remove('active');
          });
        }

        // Section Four
        const sectionFourContainerScrollTop = window.innerHeight - sectionFourContainer.current.getBoundingClientRect().top;
        const sectionFourMaxScrollTop = (window.innerHeight / 2) + sectionFourContainer.current.scrollHeight;
        const sectionFourScrollFraction = sectionFourContainerScrollTop / sectionFourMaxScrollTop;

        sectionFourLoopOutroActive = false;
        sectionFourContainer.current.classList.remove('md:pointer-events-none');

        if (sectionFourContainerScrollTop > mobileScrollAnimationOffset && sectionFourScrollFraction < 1) {
          sectionFourAnimateWords.forEach((el) => {
            el.classList.add('active');
          });
        } else {
          sectionFourAnimateWords.forEach((el) => {
            el.classList.remove('active');
          });
        }

        // Section Five
        const sectionFiveContainerScrollTop = window.innerHeight - sectionFiveContainer.current.getBoundingClientRect().top;

        sectionFiveActive = false;
        sectionFiveContainer.current.classList.remove('md:pointer-events-none');

        if (sectionFiveContainerScrollTop > mobileScrollAnimationOffset) {
          sectionFiveHorizontalRules.forEach((el) => {
            el.classList.remove('w-0');
            el.classList.add('w-full');
          });

          sectionFiveAnimateHeadings.forEach((el) => {
            el.classList.add('active');
          });

          sectionFiveAnimateParagraphs.forEach((el) => {
            el.classList.add('active');
          });

          sectionFiveAnimateWords.forEach((el) => {
            el.classList.add('active');
          });

          sectionFiveFadeIn.forEach((el) => {
            el.classList.add('delay-500');
            el.classList.remove('opacity-0');
          });

          sectionFiveFooter.forEach((el) => {
            el.classList.remove('opacity-0');
          });
        } else {
          sectionFiveHorizontalRules.forEach((el) => {
            el.classList.add('w-0');
            el.classList.remove('w-full');
          });

          sectionFiveAnimateHeadings.forEach((el) => {
            el.classList.remove('active');
          });

          sectionFiveAnimateParagraphs.forEach((el) => {
            el.classList.remove('active');
          });

          sectionFiveAnimateWords.forEach((el) => {
            el.classList.remove('active');
          });

          sectionFiveFadeIn.forEach((el) => {
            el.classList.remove('delay-500');
            el.classList.add('opacity-0');
          });

          sectionFiveFooter.forEach((el) => {
            el.classList.add('opacity-0');
          });
        }
      } else {
        // Section One
        const sectionOneContainerScrollTop = 0 - sectionOneContainer.current.getBoundingClientRect().top;
        const sectionOneMaxScrollTop = sectionOneContainer.current.scrollHeight - window.innerHeight;
        const sectionOneScrollFraction = sectionOneContainerScrollTop / sectionOneMaxScrollTop;

        if (!runSectionOneSequence && sectionOneScrollFraction > 0.05) {
          initSectionOne();
        }

        if (sectionOneScrollFraction >= 0 && sectionOneScrollFraction < 1.2) {
          sectionOneActive = true;
          sectionOneCanvas.current.classList.add('opacity-100');
          sectionOneCanvas.current.classList.remove('opacity-0');
        } else {
          sectionOneActive = false;
          sectionOneCanvas.current.classList.remove('opacity-100');
          sectionOneCanvas.current.classList.add('opacity-0');
        }

        // Section Two
        const sectionTwoContainerScrollTop = window.innerHeight - sectionTwoContainer.current.getBoundingClientRect().top;
        const sectionTwoMaxScrollTop = sectionTwoContainer.current.scrollHeight;
        const sectionTwoScrollFraction = (sectionTwoContainerScrollTop / sectionTwoMaxScrollTop);
        const normalizedSectionTwoScrollFraction =  sectionTwoScrollFraction > 1 ? 1 : sectionTwoScrollFraction < 0 ? 0 : sectionTwoScrollFraction;
        const sectionTwoFrameIndex = Math.min(
          sectionTwoFrameCount - 1,
          Math.ceil(normalizedSectionTwoScrollFraction * sectionTwoFrameCount)
        );

        sectionTwoOrderedList.current.classList.remove('mobile-active');

        if (sectionTwoScrollFraction > 1.1 || sectionTwoScrollFraction <= 0.4) {
          sectionTwoOrderedList.current.classList.remove('md:opacity-100');
          sectionTwoOrderedList.current.classList.add('md:opacity-0');

          sectionTwoContainer.current.classList.add('md:pointer-events-none');
        } else {
          sectionTwoOrderedList.current.classList.add('md:opacity-100');
          sectionTwoOrderedList.current.classList.remove('md:opacity-0');

          sectionTwoContainer.current.classList.remove('md:pointer-events-none');
        }

        if (sectionTwoScrollFraction > 0.5) {
          sectionTwoCanvas.current.classList.add('duration-700');
          sectionTwoCanvas.current.classList.remove('duration-150');
        } else {
          sectionTwoCanvas.current.classList.add('duration-150');
          sectionTwoCanvas.current.classList.remove('duration-700');
        }

        if (sectionTwoScrollFraction > 1.1) {
          sectionTwoOrderedListWrapper.current.classList.add('scrolled-past');
        } else {
          sectionTwoOrderedListWrapper.current.classList.remove('scrolled-past');
        }

        if (sectionTwoScrollFraction > 0 && sectionTwoScrollFraction <= 1.1) {
          sectionTwoCanvas.current.classList.add('opacity-100');
          sectionTwoCanvas.current.classList.remove('opacity-0');

          if (sectionTwoScrollFraction > 0.8) {
            sectionTwoOrderedList.current.setAttribute('data-position', '3');

            sectionTwoOrderedList.current.querySelectorAll('li:nth-child(3) .animate-words, li:nth-child(2) .animate-words, li:nth-child(1) .animate-words').forEach((el) => {
              el.classList.add('active');
            });
          } else if (sectionTwoScrollFraction > 0.6) {
            sectionTwoOrderedList.current.setAttribute('data-position', '2');
  
            sectionTwoOrderedList.current.querySelectorAll('li:nth-child(3) .animate-words').forEach((el) => {
              el.classList.remove('active');
            });

            sectionTwoOrderedList.current.querySelectorAll('li:nth-child(2) .animate-words, li:nth-child(1) .animate-words').forEach((el) => {
              el.classList.add('active');
            });
          } else {
            sectionTwoOrderedList.current.setAttribute('data-position', '1');

            sectionTwoOrderedList.current.querySelectorAll('li:nth-child(3) .animate-words, li:nth-child(2) .animate-words').forEach((el) => {
              el.classList.remove('active');
            });

            if (sectionTwoScrollFraction > 0.4) {
              sectionTwoOrderedList.current.querySelectorAll('li:nth-child(1) .animate-words').forEach((el) => {
                el.classList.add('active');
              });
            } else {
              sectionTwoOrderedList.current.querySelectorAll('li:nth-child(1) .animate-words').forEach((el) => {
                el.classList.remove('active');
              });
            }
          }
        } else {
          sectionTwoCanvas.current.classList.remove('opacity-100');
          sectionTwoCanvas.current.classList.add('opacity-0');
        }
        
        requestAnimationFrame(() => updateSectionTwoImage(sectionTwoFrameIndex + 1))

        // Section Three
        const sectionThreeContainerScrollTop = window.innerHeight - sectionThreeContainer.current.getBoundingClientRect().top;
        const sectionThreeMaxScrollTop = (window.innerHeight / 2) + sectionThreeContainer.current.scrollHeight;
        const sectionThreeScrollFraction = sectionThreeContainerScrollTop / sectionThreeMaxScrollTop;

        if (sectionTwoScrollFraction > 1.1 && sectionThreeScrollFraction < 1) {
          sectionThreeContainer.current.classList.remove('md:pointer-events-none');
  
          sectionThreeAnimateWords.forEach((el) => {
            el.classList.add('active');
          });
          sectionThreeAccordionContainer.classList.remove('md:opacity-0');
        } else {
          sectionThreeContainer.current.classList.add('md:pointer-events-none');
  
          sectionThreeAnimateWords.forEach((el) => {
            el.classList.remove('active');
          });
          sectionThreeAccordionContainer.classList.add('md:opacity-0');
        }
  
        if (sectionThreeScrollFraction > 1) {
          sectionThreeForeground.current.classList.add('md:scale-50');
        } else {
          sectionThreeForeground.current.classList.remove('md:scale-50');
        }

        // Section Four
        const sectionFourContainerScrollTop = window.innerHeight - sectionFourContainer.current.getBoundingClientRect().top;
        const sectionFourMaxScrollTop = (window.innerHeight / 2) + sectionFourContainer.current.scrollHeight;
        const sectionFourScrollFraction = sectionFourContainerScrollTop / sectionFourMaxScrollTop;
        const normalizedSectionFourScrollFraction =  sectionFourScrollFraction > 1 ? 1 : sectionFourScrollFraction < 0 ? 0 : sectionFourScrollFraction;
        const sectionFourFrameIndex = Math.min(
          sectionFourFrameCount - 1,
          Math.ceil(normalizedSectionFourScrollFraction * sectionFourFrameCount)
        );

        if (sectionThreeScrollFraction > 1 && sectionFourScrollFraction < 1) {
          sectionFourActive = true;

          if (sectionFourFrameIndex >= (sectionFourFrameCount - sectionFourLoopCount)) {
            sectionFourLoopOutroActive = true;
          } else {
            sectionFourLoopOutroActive = false;

            requestAnimationFrame(() => updateSectionFourImage(sectionFourFrameIndex + 1))
          }

          sectionFourCanvas.current.classList.add('opacity-100');
          sectionFourCanvas.current.classList.remove('opacity-0');

          sectionFourContainer.current.classList.remove('md:pointer-events-none');

          if (sectionFourScrollFraction >= 0.2) {
            sectionFourAnimateWords.forEach((el) => {
              el.classList.add('active');
            });
          }
        } else {
          sectionFourActive = false;

          sectionFourCanvas.current.classList.remove('opacity-100');
          sectionFourCanvas.current.classList.add('opacity-0');

          sectionFourContainer.current.classList.add('md:pointer-events-none');

          sectionFourAnimateWords.forEach((el) => {
            el.classList.remove('active');
          });
        }
        
        // Section Five
        const sectionFiveContainerScrollTop = (window.innerHeight / 2) - sectionFiveContainer.current.getBoundingClientRect().top;
        const sectionFiveMaxScrollTop = sectionFiveContainer.current.scrollHeight - (window.innerHeight / 2);
        const sectionFiveScrollFraction = sectionFiveContainerScrollTop / sectionFiveMaxScrollTop;

        if (sectionFiveScrollFraction >= 0.5) {
          sectionFiveVideo.current.classList.add('opacity-100');
          sectionFiveVideo.current.classList.remove('opacity-0', 'grayscale');

          sectionFiveFooter.forEach((el) => {
            el.classList.remove('opacity-0');
          });
        } else {
          sectionFiveVideo.current.classList.remove('opacity-100');
          sectionFiveVideo.current.classList.add('opacity-0', 'grayscale');

          sectionFiveFooter.forEach((el) => {
            el.classList.add('opacity-0');
          });
        }

        if (sectionFiveScrollFraction >= 0) {
          sectionFiveActive = true;

          sectionFiveContainer.current.classList.remove('md:pointer-events-none');

          sectionFiveHorizontalRules.forEach((el) => {
            el.classList.remove('w-0');
            el.classList.add('w-full');
          });

          sectionFiveAnimateHeadings.forEach((el) => {
            el.classList.add('active');
          });

          sectionFiveAnimateParagraphs.forEach((el) => {
            el.classList.add('active');
          });

          sectionFiveAnimateWords.forEach((el) => {
            el.classList.add('active');
          });

          sectionFiveFadeIn.forEach((el) => {
            el.classList.add('delay-500');
            el.classList.remove('opacity-0');
          });
        } else {
          sectionFiveActive = false;

          sectionFiveContainer.current.classList.add('md:pointer-events-none');

          sectionFiveHorizontalRules.forEach((el) => {
            el.classList.add('w-0');
            el.classList.remove('w-full');
          });

          sectionFiveAnimateHeadings.forEach((el) => {
            el.classList.remove('active');
          });

          sectionFiveAnimateParagraphs.forEach((el) => {
            el.classList.remove('active');
          });

          sectionFiveAnimateWords.forEach((el) => {
            el.classList.remove('active');
          });

          sectionFiveFadeIn.forEach((el) => {
            el.classList.remove('delay-500');
            el.classList.add('opacity-0');
          });
        }
      }
    });
  });

  return (
    <main>
      <header className="navbar-container w-full z-50 py-8 text-center transition-all duration-500 ease-in-out md:pointer-events-none md:py-16">
        <Navbar />
      </header>
      <section className="relative z-20" ref={sectionOneContainer}>
        <div className="background fixed z-0 inset-0 justify-center items-center overflow-hidden hidden md:flex">
          <canvas ref={sectionOneCanvas} className="transition-opacity duration-700 ease-out absolute -z-10 aspect-video min-w-full min-h-full" />
        </div>
        <div className="foreground relative z-40 w-full bg-not-dark-blue md:bg-transparent">
          <div className="absolute inset-x-0 top-0 w-full bg-no-repeat md:hidden">
            <video poster="/img/Phase1-v10mobile-static.png" className="w-full max-w-sm mx-auto aspect-square object-contain object-top" preload="true" autoPlay muted>
              <source src="/img/Phase1-v10mobile.mp4" type="video/mp4" /> 
            </video>
          </div>
          <div className="w-full md:min-h-[200vh]">
            <div className="sticky top-0 w-full flex justify-center items-center px-4 text-center pt-36 mb-30 md:min-h-screen md:pt-0 md:mb-60">
              <h1 className="hero-headline-wrapper leading-[1.05em] font-serif font-light tracking-tighter text-4xl md:text-10xl">
                <span className="block max-w-xs mx-auto md:max-w-5xl">
                  <SplitTextOnWordBoundaries className="hero-headline overflow-hidden" text={heading} />
                </span>
              </h1>
            </div>
          </div>
          <div className="text-6xl tracking-tight text-slate pb-20 md:text-11xl md:min-h-screen md:mb-0">
            <div>
              {partnerRows.map((row, index) => (
                <PartnerRow key={index} offsetIndex={index} partnerRow={row} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section ref={sectionTwoContainer} className="relative z-30 md:-mb-[15vh] transition-opacity duration-300 ease-in-out md:opacity-100 md:pointer-events-none">
        <div className="background fixed z-0 inset-0 justify-center items-center overflow-hidden hidden md:flex">
          <canvas ref={sectionTwoCanvas} className="opacity-0 transition-opacity duration-150 ease-out absolute -z-10 aspect-video min-w-full min-h-full" />
        </div>
        <div className="foreground relative z-40 w-full bg-not-dark-blue md:bg-transparent md:h-[300vh]">
          <div className="md:fixed md:inset-x-0 md:top-1/2">
            <div className="container mx-auto px-4 py-20 md:py-0">
              <div ref={sectionTwoOrderedListWrapper} className="section-2-ol-wrapper mx-auto md:transition-all md:duration-500 md:ease-out">
                <ol ref={sectionTwoOrderedList} className="section-2-ol font-light text-2xl leading-10 flex flex-col items-start space-y-20 md:text-3xl md:max-w-[31rem] md:space-y-0 md:transition-all md:duration-500 md:ease-out md:opacity-0">
                  {numberedList.map((listItem, index) => (
                    <OrderedListItem key={index} image={listItem.image} heading={listItem.heading} text={listItem.text} />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-20 md:pointer-events-none" ref={sectionThreeContainer}>
        <div ref={sectionThreeForeground} className="foreground relative z-40 w-full transition-all duration-1000 ease-out transform bg-not-dark-blue md:bg-transparent">
          <div className="container py-20 md:py-0">
            <div className="max-w-[63.5rem] mx-auto">
              <h2 className="font-serif font-light tracking-snug text-4xl mb-20 md:text-8xl">
                <SplitTextOnWordBoundaries text={accordionHeading} />
              </h2>
            </div>
            <ul className="accordion-container max-w-[50.5rem] mx-auto md:opacity-0 md:transition-opacity md:duration-300 md:delay-300">
              {accordionItems.map((item, index) => (
                <Accordion key={index} accordionItem={item} />
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div className="h-[50vh] w-full hidden md:block" />
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        ref={sectionFourContainer}
        className="relative z-10 md:pointer-events-none md:z-20"
      >
        <div className="background fixed z-0 inset-0 justify-center items-center overflow-hidden hidden md:flex">
          <canvas ref={sectionFourCanvas} className="opacity-0 transition-opacity duration-700 ease-out absolute -z-10 aspect-square min-w-full min-h-full" />
        </div>
        <div className="foreground relative z-40 w-full">
          <div className="relative z-10 bg-not-dark-blue md:bg-transparent">
            <div className="container py-20 md:pt-40 md:pb-0">
              <div className="max-w-[50.5rem]">
                <h2 className="font-serif font-light tracking-tight text-5xl mb-6 md:text-8xl">
                  <SplitTextOnWordBoundaries text={partnersHeading} />
                </h2>
                <p className="font-light text-lg leading-normal md:text-2xl md:leading-normal">
                  <SplitTextOnWordBoundaries text={partnersSubheading} />
                </p>
              </div>
            </div>
          </div>
          <div className="relative py-20 md:mb-40">
            <div className="fixed -z-1 inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:hidden">
              <video poster="/img/Phase4-v9mobile-static.png" className="absolute inset-0 w-full h-full object-cover object-center" preload="true" autoPlay loop muted>
                <source src="/img/Phase4-v9mobile.mp4" type="video/mp4" /> 
              </video>
            </div>
            <div className="container">
              <div className="max-w-sm mx-auto sm:max-w-none">
                <div className="flex flex-wrap gap-y-10 -mx-4 items-stretch sm:-mx-3 sm:gap-y-6">
                  {partnersCards.map((card, index) => (
                    <>
                    <div key={index} className="flex w-full px-4 sm:px-3 sm:w-1/2 md:w-1/3">
                      <PartnerCard image={card.image} heading={card.heading} description={card.description} bulletColorClassName={card.bulletColorClassName} bullets={card.bullets} />
                    </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        ref={sectionFiveContainer}
        className="relative z-20 md:pointer-events-none"
      >
        <div className="background fixed z-0 inset-0 justify-center items-center overflow-hidden hidden md:flex">
          <video ref={sectionFiveVideo} className="opacity-0 transition-all duration-[1.5s] ease-out grayscale absolute -z-10 object-cover object-bottom min-w-full min-h-full" preload="true" autoPlay loop muted>
            <source src="/img/Phase6-v5.mp4" type="video/mp4" /> 
          </video>
        </div>
        <div className="foreground relative z-40 w-full bg-not-dark-blue md:bg-transparent">
          <div className="container pt-10 md:pt-20">
            <div className="w-full">
              <div className="py-10 md:py-20">
                <div className="flex flex-wrap justify-between -mx-4 sm:-mx-3">
                  <div className="w-full px-4 sm:px-3 md:w-1/2">
                    <h2 className="animate-words-heading font-serif font-light tracking-tight text-4xl mb-10 md:mb-0 md:text-8xl">
                      <SplitTextOnWordBoundaries text={footerCTAHeading} /> 
                    </h2>
                  </div>
                  <div className="w-full px-4 sm:px-3 md:w-5/12">
                    <p className="animate-words-paragraph pb-6 text-lg leading-relaxed">
                      <SplitTextOnWordBoundaries text={footerCTASubheading} /> 
                    </p>
                    <div className="fade-in opacity-0 transition-opacity duration-500 delay-500">
                      <a href={footerCTALink.url} className="transition-color duration-500 ease-out text-electric-lime">
                        <svg className="inline-block mr-4" width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path className="fill-current" d="M1 5.50374C0.723858 5.50374 0.5 5.27988 0.5 5.00374C0.5 4.72759 0.723858 4.50374 1 4.50374L1 5.50374ZM8.42212 9.59843C8.22685 9.79369 7.91027 9.79369 7.71501 9.59843C7.51975 9.40316 7.51975 9.08658 7.71501 8.89132L8.42212 9.59843ZM11.9635 4.64285C12.1587 4.44757 12.4753 4.44755 12.6706 4.6428C12.8659 4.83805 12.8659 5.15463 12.6706 5.34991L11.9635 4.64285ZM7.71501 1.1088C7.51975 0.913534 7.51975 0.596951 7.71501 0.401689C7.91027 0.206427 8.22685 0.206427 8.42212 0.401689L7.71501 1.1088ZM12.6706 4.65018C12.8659 4.84544 12.8659 5.16203 12.6706 5.35729C12.4753 5.55255 12.1588 5.55255 11.9635 5.35729L12.6706 4.65018ZM1 4.50374L12.3097 4.50373V5.50373L1 5.50374L1 4.50374ZM7.71501 8.89132L11.9561 4.65018L12.6633 5.35729L8.42212 9.59843L7.71501 8.89132ZM11.9563 4.65007L11.9599 4.64639L12.6668 5.35373L12.6631 5.3574L11.9563 4.65007ZM11.9598 4.64653L11.9635 4.64285L12.6706 5.34991L12.667 5.35359L11.9598 4.64653ZM8.42212 0.401689L12.6669 4.6465L11.9598 5.35361L7.71501 1.1088L8.42212 0.401689ZM12.6669 4.6465L12.6706 4.65018L11.9635 5.35729L11.9598 5.35361L12.6669 4.6465Z"/>
                        </svg>
                        {footerCTALink.text}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-slate mx-auto transition-all duration-500 ease-out w-0" />
              <div className="fade-in-footer opacity-0 transition-opacity duration-500 pb-[22.25rem] pt-10 flex flex-wrap justify-between -mx-4 sm:-mx-3 md:pt-20 md:pb-6">
                <div className="w-full px-4 sm:px-3 md:ml-auto md:w-5/12">
                  <h3 className="font-light text-3xl leading-tight tracking-tighter mb-2 md:text-6xl">
                    <SplitTextOnWordBoundaries text="Zach Greenberger" /> 
                  </h3>
                  <h4 className="text-lg text-gray font-light leading-tighter mb-6 md:text-2xl">
                    <SplitTextOnWordBoundaries text="Head of Growth" /> 
                  </h4>
                  <ul className="flex flex-col items-start space-y-1 mb-14">
                    <li>
                      <a className="group w-full rounded-xl flex flex-wrap justify-start items-center space-x-4 px-2 py-1 text-lg leading-8 transition-color duration-500 ease-out text-cream hover:bg-opacity-[0.08] hover:bg-cream hover:text-electric-lime" href="mailto:growth@bloomgrowthagency.com">
                        <svg className="block w-5 h-auto" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path className="fill-current" d="M5.28924 0.907491C8.42388 0.635003 11.5763 0.635003 14.7109 0.907491L16.2211 1.03877C17.2265 1.12617 18.0876 1.72584 18.5337 2.58361C18.5908 2.69335 18.548 2.82621 18.4428 2.89132L12.1769 6.77024C10.833 7.60216 9.1385 7.61962 7.77778 6.81556L1.46995 3.0882C1.36804 3.02798 1.32126 2.90402 1.36719 2.79492C1.77535 1.82536 2.69298 1.13318 3.77901 1.03877L5.28924 0.907491Z" />
                          <path className="fill-current" d="M1.36206 4.76676C1.20609 4.6746 1.00709 4.77377 0.988912 4.95402C0.735176 7.46965 0.796587 10.0091 1.17314 12.5132C1.37166 13.8333 2.44907 14.8454 3.77901 14.961L5.28924 15.0923C8.42388 15.3647 11.5763 15.3647 14.7109 15.0923L16.2211 14.961C17.5511 14.8454 18.6285 13.8333 18.827 12.5132C19.2145 9.93613 19.2683 7.32162 18.9882 4.73415C18.9686 4.55264 18.7662 4.45529 18.611 4.55139L12.9664 8.04564C11.1482 9.17118 8.85566 9.19479 7.01468 8.10695L1.36206 4.76676Z" />
                        </svg>
                        <span className="transition-color duration-500 ease-out text-cream group-hover:text-white">
                          growth@bloomgrowthagency.com
                        </span>
                      </a>
                    </li>
                    <li>
                      <a className="group w-full rounded-xl flex flex-wrap justify-start items-center space-x-4 px-2 py-1 text-lg leading-8 transition-color duration-500 ease-out text-cream hover:bg-opacity-[0.08] hover:bg-cream hover:text-electric-lime" href="tel:+14136363186">
                        <svg className="block w-5 h-auto" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path className="fill-current" d="M1.00017 6.86053C2.91657 11.0344 6.32657 14.3529 10.5661 16.1519L11.2457 16.4547C12.8005 17.1475 14.6283 16.6212 15.5766 15.2077L16.4647 13.884C16.7534 13.4536 16.6655 12.8739 16.2622 12.5485L13.2503 10.1187C12.8079 9.76184 12.1574 9.84496 11.819 10.3016L10.8873 11.5589C8.49646 10.3795 6.55541 8.43849 5.37607 6.04768L6.63332 5.11596C7.08998 4.77754 7.17311 4.12702 6.81622 3.68464L4.38635 0.672698C4.061 0.269416 3.4815 0.181449 3.05113 0.470018L1.71829 1.36372C0.295947 2.31742 -0.227434 4.16027 0.481298 5.71922L0.999386 6.85884L1.00017 6.86053Z" />
                        </svg>
                        <span className="transition-color duration-500 ease-out text-cream group-hover:text-white">
                          +1 413-636-3186
                        </span>
                      </a>
                    </li>
                  </ul>
                  <nav className="text-cream flex flex-wrap space-x-6 text-lg leading-relaxed mb-2">
                    <a href="#">
                      Dribble
                    </a>
                    <a href="#">
                      LinkedIn
                    </a>
                    <a href="#">
                      Facebook
                    </a>
                    <a href="#">
                      Careers
                    </a>
                  </nav>
                  <ul className="text-cream flex flex-wrap space-x-6 text-lg leading-relaxed mb-14">
                    <li>
                      Remote first work
                    </li>
                    <li>
                      BOS
                    </li>
                    <li>
                      NYC
                    </li>
                    <li>
                      SF
                    </li>
                  </ul>
                  <p className="text-gray text-sm font-light leading-relaxed">
                    Copyright &copy; 2022 Bloom Growth Agency
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative -z-10 overflow-x-hidden md:hidden">
            <video className="relative z-10 object-contain object-bottom aspect-video w-[175%] -ml-[25%] -mt-[25%] max-w-none" preload="true" autoPlay loop muted>
              <source src="/img/Phase6-v5.mp4" type="video/mp4" /> 
            </video>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  heading: PropTypes.string,
  partnerRows: PropTypes.arrayOf(
    PropTypes.shape({
      direction: PropTypes.string,
      partners: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          fontClassName: PropTypes.string,
        }),
      ),
    }),
  ),
  numberedList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      heading: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  accordionHeading: PropTypes.string,
  accordionItems: PropTypes.arrayOf(
    PropTypes.shape({
      newtype: PropTypes.bool,
      heading: PropTypes.string,
      body: PropTypes.string,
    }),
  ),
  partnersHeading: PropTypes.string,
  partnersSubheading: PropTypes.string,
  partnersCards: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      description: PropTypes.string,
      bulletColorClassName: PropTypes.string,
      bullets: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.object,
    }),
  ),
  footerCTAHeading: PropTypes.string,
  footerCTASubheading: PropTypes.string,
  footerCTALink: PropTypes.object,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        heading={frontmatter.heading}
        partnerRows={frontmatter.partnerRows}
        numberedList={frontmatter.numberedList}
        accordionHeading={frontmatter.accordionHeading}
        accordionItems={frontmatter.accordionItems}
        partnersHeading={frontmatter.partnersHeading}
        partnersSubheading={frontmatter.partnersSubheading}
        partnersCards={frontmatter.partnersCards}
        footerCTAHeading={frontmatter.footerCTAHeading}
        footerCTASubheading={frontmatter.footerCTASubheading}
        footerCTALink={frontmatter.footerCTALink}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        description
        heading
        partnerRows {
          direction
          partners {
            text
            fontClassName
          }
        }
        numberedList {
          heading
          text
          image {
            alt
            image {
              publicURL
            }
          }
        }
        accordionHeading
        accordionItems {
          newtype
          heading
          body
        }
        partnersHeading
        partnersSubheading
        partnersCards {
          image {
            alt
            image {
              publicURL
            }
          }
          heading
          description
          bulletColorClassName
          bullets
        }
        footerCTAHeading
        footerCTASubheading
        footerCTALink {
          url
          text
        }
      }
    }
  }
`;
