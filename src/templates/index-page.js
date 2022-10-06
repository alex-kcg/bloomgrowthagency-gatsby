import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { motion } from "framer-motion";
import settings from "../data/settings.yml"
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import PartnerRow from "../components/PartnerRow";
import Accordion from "../components/Accordion";
import PartnerCard from "../components/PartnerCard";
import OrderedListItem from "../components/OrderedListItem";
import SplitTextOnWordBoundaries from "../components/SplitTextOnWordBoundaries";

const { useEffect, useRef } = React;

// eslint-disable-next-line
export const IndexPageTemplate = ({
  cmsPreview,
  title,
  description,
  heading,
  partnerRows,
  numberedList,
  accordionHeading,
  accordionItems,
  partnersHeading,
  partnersSubheading,
  partnersSubheadingLink,
  partnersCards,
  footerCTAHeading,
  footerCTASubheading,
  footerCTALink,
  footerContactHeading,
  footerContactName,
  footerContactTitle,
  footerContactEmail,
}) => {
  const sectionOneContainer = useRef(null);
  const sectionOneCanvas = useRef(null);
  const sectionOneVideo = useRef(null);

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

    const mobileScrollAnimationOffset = 300;

    const imagesMobile = {};
    const imagesPhaseOne = {};
    const imagesPhaseTwo = {};

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

            if ((index + 1) === sectionOneFrameCount) {
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

    // Push phase images to array to prepare for caching
    document.querySelectorAll('img.mobile-preload').forEach((img) => {
      imagesMobile[img.src] = img;
    });
    for (let i = 0; i < sectionOneFrameCount; i++) {
      imagesPhaseOne[currentFrame(sectionOneFilename, i)] = new Image();
    }
    for (let i = 0; i < sectionTwoFrameCount; i++) {
      imagesPhaseTwo[currentFrame(sectionTwoFilename, i)] = new Image();
    }
    for (let i = 0; i < sectionFourFrameCount; i++) {
      imagesPhaseTwo[currentFrame(sectionFourFilename, i)] = new Image();
    }

    const initSectionOneBackground = () => {
      runSectionOneSequence = true;
    }

    const initSectionOneForeground = () => {
      body.classList.add('navbar-shadow');

      setTimeout(() => {
        sectionOneAnimateWords.forEach((el) => {
          el.classList.add('active');
        });
      }, 500);
    }

    if (isMobile()) {
      body.classList.remove('md:overflow-hidden');
      sectionOneSequencesLoaded = true;

      cacheImages(imagesMobile);

      sectionOneVideo.current.addEventListener('loadeddata', function() {
        sectionOneVideo.current.classList.remove('opacity-0');
      }, false);

      initSectionOneBackground();
      setTimeout(() => {
        initSectionOneForeground();
      }, 750);
    } else {
      cacheImages(imagesPhaseOne).then(() => {
        sectionOneSequencesLoaded = true;
        body.classList.remove('md:overflow-hidden');
        sectionOneLoopIntroSequence();
  
        if (sectionOneFirstTimeoutFailed) {
          initSectionOneForeground();
        }
  
        cacheImages(imagesPhaseTwo);
      }).catch((err) => console.error(err));

      setTimeout(() => {
        if (sectionOneSequencesLoaded) {
          initSectionOneForeground();
        } else {
          sectionOneFirstTimeoutFailed = true;
        }
      }, 1000);
    }

    // Render the first frame while caching
    sectionOneImage.src = currentFrame(sectionOneFilename, 1);
    sectionOneImage.onload = function(){
      sectionOneContext.drawImage(sectionOneImage, 0, 0);
    }

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
        // Section Two and Three
        const sectionTwoContainerScrollTop = window.innerHeight - sectionTwoContainer.current.getBoundingClientRect().top;
        const sectionTwoMaxScrollTop = sectionTwoContainer.current.scrollHeight + (window.innerHeight / 2);
        const sectionTwoScrollFraction = sectionTwoContainerScrollTop / sectionTwoMaxScrollTop;
        const sectionThreeContainerScrollTop = window.innerHeight - sectionThreeContainer.current.getBoundingClientRect().top;
        const sectionThreeMaxScrollTop = (window.innerHeight / 2) + sectionThreeContainer.current.scrollHeight;
        const sectionThreeScrollFraction = sectionThreeContainerScrollTop / sectionThreeMaxScrollTop;

        sectionTwoContainer.current.classList.remove('md:pointer-events-none');

        if (sectionTwoContainerScrollTop > mobileScrollAnimationOffset && sectionTwoScrollFraction <= 1) {
          sectionTwoOrderedList.current.classList.add('mobile-active');
        } else {
          sectionTwoOrderedList.current.classList.remove('mobile-active');
        }

        sectionTwoOrderedList.current.querySelectorAll('li').forEach((el) => {
          const hr = el.querySelector('hr');
          const liScrollTop = window.innerHeight - el.getBoundingClientRect().top;
          const liScrollBottom = window.innerHeight - el.getBoundingClientRect().bottom;
          const liSpacing = 160;
          const img = el.querySelector('.fixed-image');

          if (liScrollTop > mobileScrollAnimationOffset) {
            hr.classList.remove('w-0');

            el.querySelectorAll('.animate-words').forEach((el) => {
              el.classList.add('active');
            });

            if (((liScrollBottom - liSpacing) < mobileScrollAnimationOffset) && (sectionThreeContainerScrollTop <= mobileScrollAnimationOffset)) {
              if (img) {
                img.classList.remove('delay-300');
                img.classList.remove('opacity-0');
              }
            } else {
              if (img) {
                img.classList.add('delay-300');
                img.classList.add('opacity-0');
              }
            }
          } else {
            hr.classList.add('w-0');

            if (img) {
              img.classList.add('delay-300');
              img.classList.add('opacity-0');
            }

            el.querySelectorAll('.animate-words').forEach((el) => {
              el.classList.remove('active');
            });
          }
        });

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

        if (!runSectionOneSequence && sectionOneContainerScrollTop > 0) {
          initSectionOneBackground();
          initSectionOneForeground();
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
          sectionTwoCanvas.current.classList.add('duration-500');
          sectionTwoCanvas.current.classList.remove('duration-150');
        } else {
          sectionTwoCanvas.current.classList.add('duration-150');
          sectionTwoCanvas.current.classList.remove('duration-500');
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
        const sectionThreeMaxScrollTop = (window.innerHeight * 2 / 3) + sectionThreeContainer.current.scrollHeight;
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
    <main className={`index-template ${cmsPreview && 'cms-preview'}`}>
      <header className="navbar-container z-50 w-full transition-all duration-500 ease-in-out md:pointer-events-none">
        <Navbar />
      </header>
      <section className="relative z-20" ref={sectionOneContainer}>
        <div className="background fixed z-0 inset-0 justify-center items-center overflow-hidden hidden md:flex">
          <canvas ref={sectionOneCanvas} className={`transition-opacity duration-700 ease-out absolute -z-10 aspect-video min-w-full min-h-full`} />
        </div>
        <div className="foreground relative z-40 w-full bg-not-dark-blue md:bg-transparent">
          <div className="w-full md:min-h-[200vh]">
            <div className="sticky top-0 w-full flex justify-center items-center px-4 text-center pt-36 md:min-h-screen md:pt-0 md:mb-60">
              <h1 className="hero-headline-wrapper font-serif font-light tracking-snug text-4xl md:text-11xl md:-tracking-4">
                <span className="block mx-auto sm:w-5/6 md:w-full md:max-w-5xl">
                  <SplitTextOnWordBoundaries className="hero-headline overflow-hidden" text={heading} />
                </span>
              </h1>
            </div>
          </div>
          <div className="relative -z-10 overflow-x-hidden md:hidden">
            <video ref={sectionOneVideo} poster="/img/Phase1-v10mobile-static.jpg" className="relative z-10 object-cover object-center w-full h-[26rem] opacity-0 transition-opacity duration-300 ease-in-out sm:h-auto sm:aspect-video" preload="true" autoPlay muted playsInline>
              <source src="/img/Phase1-v11mobile_BG.mp4" type="video/mp4" /> 
            </video>
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
          <canvas ref={sectionTwoCanvas} className={`opacity-0 transition-opacity duration-150 ease-out absolute -z-10 aspect-video min-w-full min-h-full`} />
        </div>
        <div className="foreground relative z-40 w-full bg-not-dark-blue md:bg-transparent md:h-[300vh]">
          <div className="section-2-outer-wrapper md:fixed md:inset-x-0 md:top-1/2">
            <div className="container mx-auto px-4 pt-20 pb-30 md:py-0">
              <div ref={sectionTwoOrderedListWrapper} className="section-2-ol-wrapper mx-auto md:transition-all md:duration-500 md:ease-out">
                <ol ref={sectionTwoOrderedList} className="section-2-ol font-light text-2xl leading-10 flex flex-col items-start space-y-40 md:text-3xl md:max-w-[31rem] md:space-y-0 md:transition-all md:duration-500 md:ease-out md:opacity-0">
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
        <div ref={sectionThreeForeground} className="foreground relative z-40 w-full transition-all duration-700 ease-out transform bg-not-dark-blue md:bg-transparent md:pt-[25vh]">
          <div className="container pb-20 pt-30 md:py-0">
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
      <div className="h-[66.667vh] w-full hidden md:block" />
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        ref={sectionFourContainer}
        className="relative z-10 md:pointer-events-none md:z-20"
      >
        <div className="background fixed z-0 inset-0 justify-center items-center overflow-hidden hidden md:flex">
          <canvas ref={sectionFourCanvas} className={`opacity-0 transition-opacity duration-700 ease-out absolute -z-10 aspect-square min-w-full min-h-full`} />
        </div>
        <div className="foreground relative z-40 w-full">
          <div className="relative z-10 bg-not-dark-blue md:bg-transparent">
            <div className="container py-20 md:pt-40 md:pb-0">
              <div className="max-w-[50.5rem]">
                <h2 className="font-serif font-light tracking-tight text-5xl mb-6 md:text-8xl">
                  <SplitTextOnWordBoundaries text={partnersHeading} />
                </h2>
                <p className="font-light text-lg leading-normal md:text-2xl md:leading-10">
                  <SplitTextOnWordBoundaries text={partnersSubheading} link={partnersSubheadingLink} />
                </p>
              </div>
            </div>
          </div>
          <div className="relative py-20 md:mb-40">
            <div className="fixed -z-1 inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:hidden">
              <video poster="/img/Phase4-v9mobile-static.jpg" className="absolute inset-0 w-full h-full object-cover object-center" preload="true" autoPlay loop muted playsInline>
                <source src="/img/Phase4-v9mobile.mp4" type="video/mp4" /> 
              </video>
            </div>
            <div className="container">
              <div className="max-w-sm mx-auto sm:max-w-none">
                <div className="flex flex-wrap gap-y-10 -mx-4 items-stretch sm:-mx-3 sm:gap-y-6">
                  {partnersCards.map((card, index) => (
                    <div key={index} className="flex w-full px-4 sm:px-3 sm:w-1/2 md:w-1/3">
                      <PartnerCard image={card.image} heading={card.heading} description={card.description} bulletColorClassName={card.bulletColorClassName} bullets={card.bullets} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      <section className="relative z-20 bg-not-dark-blue md:bg-transparent">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          ref={sectionFiveContainer}
          className="md:pointer-events-none"
        >
          <div className="background fixed z-0 inset-0 justify-center items-center overflow-hidden hidden md:flex">
            <video ref={sectionFiveVideo} poster="/img/Phase6-v5_static.jpg" className="opacity-0 transition-all duration-[1.5s] ease-out grayscale absolute -z-10 object-cover object-bottom min-w-full min-h-full" preload="true" autoPlay loop muted playsInline>
              <source src="/img/Phase6-v5.mp4" type="video/mp4" /> 
            </video>
          </div>
          <div className="foreground relative z-40 w-full">
            <div className="container pt-10 md:pt-20">
              <div className="w-full">
                <div className="py-10 md:py-20 lg:flex lg:justify-center lg:-mx-3">
                  <div className="lg:w-5/6 lg:px-3">
                    <div className="flex flex-wrap items-center md:justify-between -mx-4 sm:-mx-3">
                      <div className="w-full px-4 sm:px-3 md:w-1/2 lg:w-3/5">
                        <h2 className="animate-words-heading font-serif font-light tracking-tight text-4xl mb-10 md:mb-0 md:text-8xl">
                          <SplitTextOnWordBoundaries text={footerCTAHeading} /> 
                        </h2>
                      </div>
                      <div className="w-full px-4 sm:px-3 md:w-5/12 lg:w-2/5">
                        <p className="animate-words-paragraph pb-6 text-lg font-light leading-8">
                          <SplitTextOnWordBoundaries text={footerCTASubheading} /> 
                        </p>
                        <div className="fade-in opacity-0 transition-opacity duration-500 delay-500">
                          <a href={footerCTALink.url} className="transition-color duration-500 ease-out text-electric-lime hover:underline">
                            <svg className="inline-block mr-2" width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path className="fill-current" d="M1 5.50374C0.723858 5.50374 0.5 5.27988 0.5 5.00374C0.5 4.72759 0.723858 4.50374 1 4.50374L1 5.50374ZM8.42212 9.59843C8.22685 9.79369 7.91027 9.79369 7.71501 9.59843C7.51975 9.40316 7.51975 9.08658 7.71501 8.89132L8.42212 9.59843ZM11.9635 4.64285C12.1587 4.44757 12.4753 4.44755 12.6706 4.6428C12.8659 4.83805 12.8659 5.15463 12.6706 5.34991L11.9635 4.64285ZM7.71501 1.1088C7.51975 0.913534 7.51975 0.596951 7.71501 0.401689C7.91027 0.206427 8.22685 0.206427 8.42212 0.401689L7.71501 1.1088ZM12.6706 4.65018C12.8659 4.84544 12.8659 5.16203 12.6706 5.35729C12.4753 5.55255 12.1588 5.55255 11.9635 5.35729L12.6706 4.65018ZM1 4.50374L12.3097 4.50373V5.50373L1 5.50374L1 4.50374ZM7.71501 8.89132L11.9561 4.65018L12.6633 5.35729L8.42212 9.59843L7.71501 8.89132ZM11.9563 4.65007L11.9599 4.64639L12.6668 5.35373L12.6631 5.3574L11.9563 4.65007ZM11.9598 4.64653L11.9635 4.64285L12.6706 5.34991L12.667 5.35359L11.9598 4.64653ZM8.42212 0.401689L12.6669 4.6465L11.9598 5.35361L7.71501 1.1088L8.42212 0.401689ZM12.6669 4.6465L12.6706 4.65018L11.9635 5.35729L11.9598 5.35361L12.6669 4.6465Z"/>
                            </svg>
                            {footerCTALink.text}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="border-slate mx-auto transition-all duration-500 ease-out w-0" />
                <div className="fade-in-footer text-base text-cream opacity-0 transition-opacity duration-500 pt-10 md:pt-20 md:pb-10">
                  <div className="w-full">
                    <div className="lg:flex lg:justify-center lg:-mx-3">
                      <div className="lg:w-5/6 lg:px-3">
                        <div className="md:flex md:justify-end md:-mx-3">
                          <div className="w-full md:px-3 md:w-5/12 lg:w-2/5">
                            <h3 className="font-serif font-light tracking-tight text-4xl mb-6">
                              <SplitTextOnWordBoundaries text={footerContactHeading} /> 
                            </h3>
                            <h4 className="mb-1">
                              <SplitTextOnWordBoundaries text={footerContactName} /> 
                            </h4>
                            <p className="font-light mb-1">
                              <SplitTextOnWordBoundaries text={footerContactTitle} /> 
                            </p>
                            <a className="underline font-light transition-color duration-300 ease-out hover:text-electric-lime" href={`mailto:${footerContactEmail}`}>
                              {footerContactEmail}
                            </a>
                            <ul className="text-electric-lime flex flex-wrap space-x-4 leading-relaxed mt-6 mb-10 md:mb-14">
                              {settings.footer.socialMediaLinks.map((data, index) => {
                                return <li key={`footer_social_${index}`}>
                                  <a href={data.url} className="hover:underline" target="_blank">
                                    {data.text}
                                  </a>
                                </li>
                              })}
                            </ul>
                            <nav className="text-gray text-xs font-light flex flex-wrap space-x-4 mb-2">
                              {settings.footer.navLinks.map((data, index) => {
                                return <a href={data.url} className="underline transition-color duration-300 ease-out hover:text-white" key={`footer_nav_${index}`}>
                                  {data.text}
                                </a>
                              })}
                            </nav>
                            <p className="text-gray text-xs font-light">
                              {settings.footer.signoff}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative -z-10 overflow-x-hidden md:hidden">
              <video poster="/img/Phase6-v5-Mobile_static.jpg" className="relative z-10 object-cover object-top w-full h-80 sm:h-auto sm:aspect-video" preload="true" autoPlay loop muted playsInline>
                <source src="/img/Phase6-v5-Mobile.mp4" type="video/mp4" /> 
              </video>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

IndexPageTemplate.propTypes = {
  cmsPreview: PropTypes.bool,
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
      image: PropTypes.oneOfType([PropTypes.string,PropTypes.object]),
      heading: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  accordionHeading: PropTypes.string,
  accordionItems: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      body: PropTypes.string,
    }),
  ),
  partnersHeading: PropTypes.string,
  partnersSubheading: PropTypes.string,
  partnersSubheadingLink: PropTypes.object,
  partnersCards: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      description: PropTypes.string,
      bulletColorClassName: PropTypes.string,
      bullets: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.oneOfType([PropTypes.string,PropTypes.object]),
    }),
  ),
  footerCTAHeading: PropTypes.string,
  footerCTASubheading: PropTypes.string,
  footerCTALink: PropTypes.object,
  footerContactHeading: PropTypes.string,
  footerContactName: PropTypes.string,
  footerContactTitle: PropTypes.string,
  footerContactEmail: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        cmsPreview={false}
        title={frontmatter.title}
        description={frontmatter.description}
        heading={frontmatter.heading}
        partnerRows={frontmatter.partnerRows}
        numberedList={frontmatter.numberedList}
        accordionHeading={frontmatter.accordionHeading}
        accordionItems={frontmatter.accordionItems}
        partnersHeading={frontmatter.partnersHeading}
        partnersSubheading={frontmatter.partnersSubheading}
        partnersSubheadingLink={frontmatter.partnersSubheadingLink}
        partnersCards={frontmatter.partnersCards}
        footerCTAHeading={frontmatter.footerCTAHeading}
        footerCTASubheading={frontmatter.footerCTASubheading}
        footerCTALink={frontmatter.footerCTALink}
        footerContactHeading={frontmatter.footerContactHeading}
        footerContactName={frontmatter.footerContactName}
        footerContactTitle={frontmatter.footerContactTitle}
        footerContactEmail={frontmatter.footerContactEmail}
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
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
          heading
          body
        }
        partnersHeading
        partnersSubheading
        partnersSubheadingLink {
          href
          text
        }
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
        footerContactHeading
        footerContactName
        footerContactTitle
        footerContactEmail
      }
    }
  }
`;
