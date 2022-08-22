import React from "react";
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

const { useEffect } = React;

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
}) => {
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    const currentFrame = (filename, fileformat, index) => (
      `/img/${filename}${index.toString().padStart(4, '0')}.${fileformat}`
    )

    const setupCanvasContext = (canvas, canvasWidth, canvasHeight) => {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      return canvas.getContext('2d');
    };

    const preloadImages = (filename, fileformat, frameCount) => {
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(filename, fileformat, i);

        console.log('caching', currentFrame(filename, fileformat, i));
      }
    };

    const setupSectionOne = () => {
      const selector = 'hero';
      const filename = 'BG-SiteAnim-PlanterModel-Phase1-v9-frame_DeMain_';
      const fileformat = 'jpg';
      const canvasWidth = 1440;
      const canvasHeight = 810;
      const frameCount = 120;
      const loop = 20;

      const container = document.getElementById(selector);
      const canvas = container.querySelector('canvas');
      const context = setupCanvasContext(canvas, canvasWidth, canvasHeight);
      const img = new Image();

      img.src = currentFrame(filename, fileformat, 1);
      img.onload = function(){
        context.drawImage(img, 0, 0);
      }

      const updateImage = index => {
        img.src = currentFrame(filename, fileformat, index);
        context.drawImage(img, 0, 0);
      }

      let scrolled = false;

      const loopSpeedInterval = 75,
            playbackSpeedInterval = 40;

      function loopOutroSequence () {
        for (let i = 0; i < loop; i++) {
          (function(index) {
            setTimeout(function() {
              requestAnimationFrame(() => updateImage(frameCount - loop + index + 1))

              console.log('looping outro', index);

              if ((index + 1) === loop) {
                loopOutroSequence()
              }
            }, loopSpeedInterval * (index + 1))
          })(i);
        }
      }

      function playSequence () {
        for (let i = loop; i < frameCount; i++) {
          (function(index) {
            setTimeout(function() {
              requestAnimationFrame(() => updateImage(index + 1))

              console.log('playing sequence', index);

              if ((index + 1) == frameCount) {
                loopOutroSequence();
              }
            }, playbackSpeedInterval * (index - loop + 1))
          })(i);
        }
      }

      function loopIntroSequence () {
        for (let i = 0; i < loop; i++) {
          (function(index) {
            setTimeout(function() {
              requestAnimationFrame(() => updateImage(index + 1))

              console.log('looping intro', index);

              if ((index + 1) === loop) {
                if (scrolled) {
                  playSequence()
                } else {
                  loopIntroSequence()
                }
              }
            }, loopSpeedInterval * (index + 1))
          })(i);
        }
      }

      window.addEventListener('scroll', () => {
        const containerScrollTop = 0 - container.getBoundingClientRect().top;
        const maxScrollTop = container.scrollHeight - window.innerHeight;
        const scrollFraction = containerScrollTop / maxScrollTop;

        if (scrollFraction > 0.2) {
          scrolled = true
          document.body.classList.add('scrolled');
        }

        if (scrollFraction >= 0 && scrollFraction < 1.2) {
          canvas.classList.add('opacity-100');
          canvas.classList.remove('opacity-0');
        } else {
          canvas.classList.remove('opacity-100');
          canvas.classList.add('opacity-0');
        }
      });

      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(filename, fileformat, i);

        console.log('caching', currentFrame(filename, fileformat, i));

        if ((i + 1) === frameCount) {
          loopIntroSequence()
        }
      }
    };

    const setupSectionTwo = () => {
      const selector = 'section-1';
      const filename = 'BG-SiteAnim-PlanterModel-Phase2-v8-frame_DeMain_';
      const fileformat = 'jpg';
      const canvasWidth = 1440;
      const canvasHeight = 810;
      const frameCount = 120;

      const container = document.getElementById(selector);
      const canvas = container.querySelector('canvas');
      const orderedList = container.querySelector('.section-1-ol');
      const context = setupCanvasContext(canvas, canvasWidth, canvasHeight);
      const img = new Image();

      preloadImages(filename, fileformat, frameCount);

      img.src = currentFrame(filename, fileformat, 1);
      img.onload = function(){
        context.drawImage(img, 0, 0);
      }

      const updateImage = index => {
        img.src = currentFrame(filename, fileformat, index);
        context.drawImage(img, 0, 0);
      }

      window.addEventListener('scroll', () => {
        const containerScrollTop = window.innerHeight - container.getBoundingClientRect().top;
        const maxScrollTop = window.innerHeight + container.scrollHeight;
        const scrollFraction = containerScrollTop / maxScrollTop;
        const normalizedScrollFraction =  scrollFraction > 1 ? 1 : scrollFraction < 0 ? 0 : scrollFraction;
        const frameIndex = Math.min(
          frameCount - 1,
          Math.ceil(normalizedScrollFraction * frameCount)
        );

        if (scrollFraction > 1 || scrollFraction <= 0.4) {
          orderedList.classList.remove('md:opacity-100');
          orderedList.classList.add('md:opacity-0');
        } else {
          orderedList.classList.add('md:opacity-100');
          orderedList.classList.remove('md:opacity-0');
        }

        if (scrollFraction >= 0 && scrollFraction < 1) {
          canvas.classList.add('opacity-100');
          canvas.classList.remove('opacity-0');

          if (scrollFraction > 0.8) {
            orderedList.setAttribute('data-position', '3');
          } else if (scrollFraction > 0.6) {
            orderedList.setAttribute('data-position', '2');
          } else {
            orderedList.setAttribute('data-position', '1');
          }
        } else {
          canvas.classList.remove('opacity-100');
          canvas.classList.add('opacity-0');
        }
        
        requestAnimationFrame(() => updateImage(frameIndex + 1))
      })
    };

    const setupSectionThree = () => {
      const selector = 'section-3';
      const filename = 'Phase4-v7-frame_DeMain_';
      const fileformat = 'jpg';
      const canvasWidth = 960;
      const canvasHeight = 960;
      const frameCount = 69;

      const container = document.getElementById(selector);
      const canvas = container.querySelector('canvas');
      const context = setupCanvasContext(canvas, canvasWidth, canvasHeight);
      const img = new Image();

      preloadImages(filename, fileformat, frameCount);

      img.src = currentFrame(filename, fileformat, 1);
      img.onload = function(){
        context.drawImage(img, 0, 0);
      }

      const updateImage = index => {
        img.src = currentFrame(filename, fileformat, index);
        context.drawImage(img, 0, 0);
      }

      window.addEventListener('scroll', () => {
        const containerScrollTop = window.innerHeight - container.getBoundingClientRect().top;
        const maxScrollTop = window.innerHeight + container.scrollHeight;
        const scrollFraction = containerScrollTop / maxScrollTop;
        const normalizedScrollFraction =  scrollFraction > 1 ? 1 : scrollFraction < 0 ? 0 : scrollFraction;
        const frameIndex = Math.min(
          frameCount - 1,
          Math.ceil(normalizedScrollFraction * frameCount)
        );

        if (scrollFraction >= 0 && scrollFraction < 1) {
          canvas.classList.add('opacity-100');
          canvas.classList.remove('opacity-0');
        } else {
          canvas.classList.remove('opacity-100');
          canvas.classList.add('opacity-0');
        }
        
        requestAnimationFrame(() => updateImage(frameIndex + 1))
      })
    };

    const setupSectionFour = () => {
      const selector = 'section-4';
      const filename = 'Phase6-v5-frame_DeMain_';
      const fileformat = 'jpg';
      const canvasWidth = 960;
      const canvasHeight = 540;
      const frameCount = 59;
      const loopInterval = 75;

      const container = document.getElementById(selector);
      const canvas = container.querySelector('canvas');
      const context = setupCanvasContext(canvas, canvasWidth, canvasHeight);
      const img = new Image();

      img.src = currentFrame(filename, fileformat, 1);
      img.onload = function(){
        context.drawImage(img, 0, 0);
      }

      preloadImages(filename, fileformat, frameCount);

      const updateImage = index => {
        img.src = currentFrame(filename, fileformat, index);
        context.drawImage(img, 0, 0);
      }

      window.addEventListener('scroll', () => {
        const containerScrollTop = window.innerHeight - container.getBoundingClientRect().top;
        const maxScrollTop = container.scrollHeight;
        const scrollFraction = containerScrollTop / maxScrollTop;

        if (scrollFraction >= 0) {
          canvas.classList.add('opacity-100');
          canvas.classList.remove('opacity-0');
        } else {
          canvas.classList.remove('opacity-100');
          canvas.classList.add('opacity-0');
        }
      });

      let i = 0;

      function sequenceFrame () {
        if (i >= frameCount) {
          i = 0;
        }

        requestAnimationFrame(() => updateImage(i++ + 1));
      }
  
      setInterval(sequenceFrame, loopInterval);
    };

    setupSectionOne();
    setupSectionTwo();
    setupSectionThree();
    setupSectionFour();
  });

  const globalTransitionYDistance = 200;
  const globalTransitionYOffset = '20vh';
  const globalTransitionDuration = 0.5;
  const globalTransitionEase = 'easeOut';

  return (
    <main>
      <header className="navbar-container z-50 py-8 text-center transition-all duration-500 ease-in-out md:py-16">
        <Navbar />
      </header>
      <section id="hero">
        <div className="background fixed z-0 inset-0 justify-center items-center overflow-hidden hidden md:flex">
          <canvas className="transition-opacity duration-300 ease-out absolute aspect-video min-w-full min-h-full" />
        </div>
        <div
          className="foreground relative z-40 w-full"
        >
          <div className="w-full md:min-h-[200vh]">
            <div className="sticky top-0 w-full flex justify-center items-center px-4 text-center pt-36 mb-30 md:min-h-screen md:pt-0 md:mb-60">
              <motion.div
                initial={{ opacity: 0.5 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 'all' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full md:-my-44 md:py-44"
              >
                <h1 className="hero-headline-wrapper font-serif font-light tracking-tighter text-4xl md:text-10xl">
                  <span className="block max-w-xs mx-auto md:max-w-5xl">
                    <SplitTextOnWordBoundaries className="hero-headline overflow-hidden" text={heading} delay={0.5} />
                  </span>
                </h1>
              </motion.div>
            </div>
          </div>
          <div className="text-6xl tracking-tight text-slate pb-20 md:text-11xl md:min-h-screen md:mb-0">
            <div>
              {partnerRows.map((row, index) => (
                <PartnerRow key={index} partnerRow={row} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="section-1">
        <div className="background fixed z-0 inset-0 justify-center items-center overflow-hidden hidden md:flex">
          <canvas className="opacity-0 transition-opacity duration-300 ease-out absolute aspect-video min-w-full min-h-full" />
        </div>
        <div className="foreground relative z-40 w-full md:100vh">
          <div className="md:fixed md:inset-x-0 md:top-1/2">
            <div className="container mx-auto px-4 py-20 md:py-0">
              <div className="max-w-[63.5rem] mx-auto">
                <ol className="section-1-ol font-light text-lg md:text-3xl leading-normal tracking-tighter flex flex-col items-start space-y-20 md:w-1/2 md:space-y-0 md:transition-all md:duration-500 md:ease-out md:opacity-0">
                  {numberedList.map((listItem, index) => (
                    <OrderedListItem key={index} index={(index + 1) > 9 ? '' + (index + 1) : '0' + (index + 1)} text={listItem.text} />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="h-[100vh] w-full hidden md:block" />
      <section id="section-2">
        <div className="foreground relative z-40 w-full">
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: globalTransitionDuration, ease: globalTransitionEase }}
            viewport={{ once: true, offset: globalTransitionYOffset }}
            className="container py-20 md:py-0"
          >
            <motion.div
              initial={{ translateY: globalTransitionYDistance }}
              whileInView={{ translateY: 0 }}
              transition={{ duration: globalTransitionDuration, ease: globalTransitionEase }}
              viewport={{ once: true, offset: globalTransitionYOffset }}
              className="max-w-[63.5rem] mx-auto"
            >
              <h2 className="font-serif font-light tracking-snug text-4xl mb-20 max-w-[37.5rem] md:text-8xl md:mb-40">
                <SplitTextOnWordBoundaries text={accordionHeading} />
              </h2>
            </motion.div>
            <motion.ul
              initial={{ translateY: globalTransitionYDistance }}
              whileInView={{ translateY: 0 }}
              transition={{ duration: globalTransitionDuration, ease: globalTransitionEase }}
              viewport={{ once: true, offset: globalTransitionYOffset }}
              className="max-w-[50.5rem] mx-auto"
            >
              {accordionItems.map((item, index) => (
                <Accordion key={index} accordionItem={item} />
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>
      <div className="h-screen w-full hidden md:block" />
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        id="section-3"
      >
        <div className="background fixed z-0 inset-0 justify-center items-center overflow-hidden hidden md:flex">
          <canvas className="opacity-0 transition-opacity duration-300 ease-out absolute aspect-square min-w-full min-h-full" />
        </div>
        <div className="foreground relative z-40 w-full">
          <div className="container py-20 md:py-40">
            <div className="max-w-[63.5rem] mx-auto">
              <div className="max-w-[37.5rem]">
                <h2 className="font-serif font-light tracking-tight text-5xl mb-14 md:text-8xl">
                  <SplitTextOnWordBoundaries text={partnersHeading} />
                </h2>
                <p className="font-light text-lg leading-normal mb-20 tracking-tighter md:text-3xl md:leading-normal md:mb-40">
                  <SplitTextOnWordBoundaries text={partnersSubheading} />
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-y-10 -mx-4 items-stretch sm:-mx-3 sm:gap-y-6">
              <div className="flex w-full px-4 sm:px-3 sm:w-1/2 md:w-1/3">
                <PartnerCard
                  logo={`<svg width="130" height="40" viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-current" d="M92.7076 11.6279C90.2679 11.6279 87.3531 12.5 84.5624 15.5249C81.7716 12.5 78.8359 11.6279 76.4203 11.6279C76.4203 11.6279 67.0801 10.9238 67.0801 21.8508V39.5349H73.8405V22.844C73.8405 17.9506 77.1063 17.8472 77.7473 17.9926C77.7473 17.9926 78.9261 18.0572 80.0018 19.1747C80.0018 19.1747 77.8519 21.9945 77.6861 25.5378C77.6861 25.5378 77.211 34.7222 84.5495 34.7222C91.888 34.7222 91.4129 25.5378 91.4129 25.5378C91.247 21.9929 89.0972 19.1747 89.0972 19.1747C90.1729 18.0556 91.3517 17.9926 91.3517 17.9926C91.9717 17.8311 95.2585 17.9506 95.2585 22.844V39.5349H102.019V21.8508C101.998 10.9254 92.6786 11.6279 92.6786 11.6279H92.7076ZM84.543 29.7481C83.0937 29.7481 82.6203 27.9231 82.5993 26.1822C82.5574 23.1557 84.5221 20.9787 84.543 20.9367C84.5849 20.9787 86.527 23.1557 86.4868 26.1822C86.4868 27.9231 85.9908 29.7481 84.543 29.7481ZM56.5322 12.0849H63.2925V39.5397H56.5322V12.0849ZM59.922 0.182492C57.6675 0.182492 55.8075 2.00743 55.8075 4.2458C55.8097 5.33951 56.2438 6.3878 57.015 7.16117C57.7861 7.93454 58.8315 8.36996 59.922 8.37209C62.154 8.37209 63.9737 6.52778 63.9737 4.2458C63.9596 3.17257 63.5281 2.14729 62.7713 1.38833C62.0145 0.629371 60.9922 0.196709 59.922 0.182492ZM35.1351 13.9099V0H28.436V39.5559H35.1351V19.7561C46.2355 14.3459 45.8232 22.9054 45.8232 22.9054V39.5349H52.5417V22.907C52.5207 6.8217 38.5057 12.1269 35.1496 13.9309L35.1351 13.9099ZM111.312 27.156C114.91 28.4205 119.477 28.3188 119.477 28.3188C130.31 28.2542 129.999 20.3569 129.999 20.3569C129.73 11.4632 119.311 11.6295 119.311 11.6295C110.691 11.6295 104.657 17.5565 104.657 26.0384C104.657 34.5203 110.567 39.9919 119.706 39.9919C123.591 39.9919 127.274 38.9131 129.877 37.0268V30.4958C127.168 32.8375 123.923 34.0811 120.491 34.0811C120.512 34.0811 111.127 34.5575 111.312 27.156ZM112.138 21.3711C113.275 18.49 115.633 16.9784 118.982 16.9784C121.731 16.9784 123.324 18.1411 123.324 19.9822C123.324 22.5743 120.425 22.802 117.681 22.802C114.992 22.802 113.34 22.5113 112.596 22.3256L111.871 22.1592L112.138 21.3711ZM14.5819 39.9871C19.3374 39.9871 22.7063 38.1831 24.7273 36.6699V30.0969C21.7707 32.4386 18.2987 33.7871 15.218 33.7871C10.2983 33.7871 6.84409 30.3876 6.84409 25.4942C6.84409 20.8511 9.98432 17.6163 14.4724 17.6163C15.9218 17.6163 17.2004 17.9877 18.5467 18.3624C19.9316 18.7565 21.3809 19.1909 23.0944 19.1909C23.6322 19.1909 24.1701 19.1489 24.7048 19.0665V12.8068L23.3617 12.8876C21.8109 12.8876 20.4051 12.5969 18.938 12.2868C17.3872 11.9557 15.7978 11.6408 13.9136 11.6408C10.1727 11.6408 6.69916 12.9683 4.15477 15.4134C1.44612 18.0055 0 21.6118 0 25.8204C0 34.1747 5.99542 40 14.5948 40L14.5819 39.9871Z"/>
                  </svg>`}
                  heading="Chime"
                  bulletColorClassName="bg-summer-rain"
                  bullets={['Series G', 'Consumer Fintech']}
                  description="Strategic design across the mobile application focused on growth, retention, and money movement experienced by over xxxxx members."
                />
              </div>
              <div className="flex w-full px-4 sm:px-3 sm:w-1/2 md:w-1/3">
                <PartnerCard
                  logo={`<svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current" fill-rule="evenodd" clip-rule="evenodd" d="M7.53995 7.81264H11.4882V40.2931H9.07596V9.91726H7.53995V7.81264ZM10.3046 48C17.6152 48 20.6092 44.0365 20.6092 37.6369V10.291C20.6092 3.87613 17.6408 0 10.3046 0C2.96824 0 0 3.87613 0 10.291L2.755e-05 37.6369C2.755e-05 44.0517 2.99393 48 10.3046 48Z"/>
                  <path class="fill-current" d="M54.6585 39.9038V26.7377H61.2445C61.63 26.7377 61.9424 26.4304 61.9424 26.0511V20.0004C61.9424 19.6211 61.63 19.3137 61.2445 19.3137H54.6585V8.08581H63.1621C63.5476 8.08581 63.8602 7.77841 63.8602 7.3992V1.29244C63.8602 0.913236 63.5476 0.605835 63.1621 0.605835H46.9778C46.5923 0.605835 46.2799 0.913236 46.2799 1.29244V46.705C46.2799 47.0843 46.5923 47.3917 46.9778 47.3917H63.3021C63.6876 47.3917 64 47.0843 64 46.705V40.5903C64 40.211 63.6876 39.9038 63.3021 39.9038H54.6585Z"/>
                  <path class="fill-current" d="M22.6606 46.705C22.6606 47.0843 22.9732 47.3917 23.3587 47.3917H28.9009C29.2865 47.3917 29.599 47.0843 29.599 46.705V22.1888H30.2334L36.1389 46.8624C36.2132 47.1724 36.4945 47.3917 36.8184 47.3917H43.5348C43.9203 47.3917 44.2327 47.0843 44.2327 46.705V1.29244C44.2327 0.913238 43.9203 0.605835 43.5348 0.605835H37.9926C37.607 0.605835 37.2945 0.913236 37.2945 1.29244V23.326H36.6875L31.4446 1.137C31.3712 0.825974 31.0895 0.605835 30.7648 0.605835H23.3587C22.9732 0.605835 22.6606 0.913236 22.6606 1.29244V46.705Z"/>
                  </svg>
                  `}
                  heading="One" 
                  bulletColorClassName="bg-electric-lime"
                  bullets={['Series B', 'Consumer Fintech']}
                  description="Standing up a core banking application and design system to supply modern banking for the underserved. Powered by the good folks at Walmart. "
                />
              </div>
              <div className="flex w-full px-4 sm:px-3 sm:w-1/2 md:w-1/3">
                <PartnerCard
                  logo={`<svg width="216" height="32" viewBox="0 0 216 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current" d="M26.4131 0.661262L17.6534 24.5072L8.84908 0.661262H0V31.5156H3.2179V3.12962L13.765 31.5156H18.2792L28.782 3.21782V31.5156H34.9494V0.661262H26.4131Z"/>
                  <path class="fill-current" d="M53.6345 27.857C52.115 30.237 49.6567 31.9562 46.0814 31.9562C42.2826 31.9562 38.305 30.193 38.305 25.6531C38.305 21.4215 41.523 19.4382 49.2545 18.1598L53.3662 17.4989V16.2204C53.3662 12.4738 51.8467 10.8871 49.0758 10.8871C46.3495 10.8871 44.9194 12.6943 44.696 15.8677H39.0647C39.5563 11.5483 43.7575 8.68308 49.0758 8.68308C55.3327 8.68308 59.1762 11.5483 59.1315 17.4545L59.0868 26.9311C59.0868 27.6805 59.1762 28.9149 59.3103 31.5155H53.7684L53.6345 27.857ZM53.3662 21.9061V20.0111C47.1986 20.4958 44.2938 22.1712 44.2938 25.2124C44.2938 27.6805 45.9473 29.0471 48.0477 29.0471C50.8187 29.0471 53.3662 26.4024 53.3662 21.9061Z"/>
                  <path class="fill-current" d="M63.5299 9.21223H69.4291V31.5156H63.5299V9.21223Z"/>
                  <path class="fill-current" d="M79.9678 31.5156H74.0686V9.21219H79.7892V13.1351C81.0852 10.4022 83.6776 8.72734 87.1634 8.72734C91.7666 8.72734 95.1187 10.9754 95.1187 17.6309V31.5156H89.2193V17.058C89.2193 13.1351 87.7891 11.5923 85.4205 11.5923C82.7388 11.5923 79.9678 14.281 79.9678 20.8927V31.5156Z"/>
                  <path class="fill-current" d="M97.4274 22.1271H103.416C103.684 26.9314 106.321 29.4438 110.567 29.4438C114.366 29.4438 117.494 27.5485 117.494 24.3748C117.494 21.4658 115.17 20.0114 111.237 18.9535L107.93 18.0718C101.673 16.3971 98.8574 14.105 98.8574 9.47665C98.8574 3.87911 104.444 7.99257e-05 110.656 7.99257e-05C117.405 7.99257e-05 122.232 2.99718 122.768 8.50716H116.824C116.6 4.67243 114.455 2.51254 110.656 2.51254C106.991 2.51254 104.355 4.62812 104.355 7.58133C104.355 9.96171 105.964 11.3721 109.628 12.3419L113.516 13.3555C119.416 14.8984 123.125 17.0581 123.125 22.2594C123.125 28.6505 116.824 31.9562 110.567 31.9562C103.192 31.9562 98.0082 28.6946 97.4274 22.1271Z"/>
                  <path class="fill-current" d="M147.434 31.5156H141.534V9.21219H147.21V14.281C147.478 13.4437 147.881 12.606 148.506 11.7686C149.758 10.0496 151.232 9.12399 153.512 9.12399C154.048 9.12399 154.674 9.16809 155.076 9.21219V13.9726C153.914 13.8403 152.886 13.7521 151.724 13.7521C149.579 13.7521 147.434 14.722 147.434 19.0857V31.5156Z"/>
                  <path class="fill-current" d="M174.169 24.5953C173.365 27.4163 171.175 29.3114 167.912 29.3114C164.828 29.3114 162.651 27.196 161.855 23.6468L172.775 18.6652L172.779 18.6667L177.098 16.6964C175.876 11.5918 171.436 8.72732 166.348 8.72732C160.672 8.72732 154.996 13.003 154.996 20.3197C154.996 28.1214 160.762 32 167.018 32C172.471 32 176.404 29.1353 177.432 24.5953H174.169ZM161.416 19.1164C161.429 16.7789 161.639 13.8093 163.471 12.0587C164.246 11.3175 165.279 10.9753 166.348 10.9753C169.288 10.9753 170.698 13.2212 170.885 16.904L161.541 21.1671C161.511 20.6599 161.416 19.7389 161.416 19.1164Z"/>
                  <path class="fill-current" d="M197.806 24.5953C197.002 27.4163 194.812 29.3114 191.549 29.3114C188.465 29.3114 186.288 27.196 185.492 23.6468L196.412 18.6652L196.416 18.6667L200.735 16.6964C199.513 11.5918 195.073 8.72732 189.985 8.72732C184.309 8.72732 178.633 13.003 178.633 20.3197C178.633 28.1214 184.398 32 190.655 32C196.108 32 200.041 29.1353 201.068 24.5953H197.806ZM185.158 17.9837C185.337 13.5316 186.901 10.9753 189.985 10.9753C192.925 10.9753 194.335 13.2212 194.522 16.904L185.176 21.1677C185.165 20.9187 185.158 20.6663 185.158 20.4079V17.9837Z"/>
                  <path class="fill-current" d="M61.8729 3.53478L66.4798 7.06956L71.0868 3.53478L66.4798 0L61.8729 3.53478Z"/>
                  <path class="fill-current" d="M133.673 0.610424L127.774 3.30055V9.21187H123.975V11.5921H127.774V26.2263C127.774 30.5015 129.874 31.5594 134.21 31.5594C136.579 31.5594 138.009 31.5153 139.081 31.4714V29.1354H136.221C134.523 29.1354 133.629 28.6064 133.629 26.4024L133.673 11.5921H139.081V9.21187H133.673V0.610424Z"/>
                  <path class="fill-current" d="M210.592 0.610424L204.693 3.30055V9.21187H200.894V11.5921H204.693V26.2263C204.693 30.5015 206.793 31.5594 211.129 31.5594C213.497 31.5594 214.928 31.5153 216 31.4714V29.1354H213.14C211.442 29.1354 210.548 28.6064 210.548 26.4024L210.592 11.5921H216V9.21187H210.592V0.610424Z"/>
                  </svg>
                  `}
                  heading="MainStreet" 
                  bulletColorClassName="bg-voltage"
                  bullets={['Series A', 'B2b Fintech']}
                  description="Designing alongside a new initiative product and engineering team to validate new products for over 2,000 businesses who have saved over 100,000 on the platform."
                />
              </div>
              <div className="flex w-full px-4 sm:px-3 sm:w-1/2 md:w-1/3">
                <PartnerCard
                  logo={`<svg width="164" height="40" viewBox="0 0 164 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current" fill-rule="evenodd" clip-rule="evenodd" d="M16.8966 13.6232C17.16 13.6232 17.3816 13.6351 17.5612 13.6589C17.7408 13.6828 17.9024 13.7275 18.0461 13.7931C18.1898 13.8587 18.3275 13.9511 18.4592 14.0703C18.591 14.1895 18.7406 14.3505 18.9083 14.5532L31.3376 30.2017C31.2897 29.7009 31.2538 29.2151 31.2298 28.7442C31.2059 28.2732 31.1939 27.8291 31.1939 27.4118V13.6232H36.5464V39.6803H33.3852C32.9182 39.6803 32.5231 39.6087 32.1997 39.4656C31.8764 39.3226 31.5651 39.0603 31.2658 38.6787L18.9262 23.1554C18.9622 23.6084 18.9921 24.0526 19.016 24.4877C19.04 24.9229 19.052 25.3313 19.052 25.7128V39.6803H13.6995V13.6232H16.8966ZM55.4418 18.9169C55.2622 19.203 55.0736 19.4176 54.8761 19.5607C54.6785 19.7038 54.424 19.7753 54.1127 19.7753C53.8373 19.7753 53.5409 19.6889 53.2236 19.516C52.9063 19.3431 52.5471 19.1494 52.1459 18.9347C51.7448 18.7201 51.2868 18.5264 50.7719 18.3535C50.257 18.1806 49.6702 18.0942 49.0117 18.0942C47.8741 18.0942 47.0269 18.3356 46.4701 18.8185C45.9133 19.3014 45.6349 19.9541 45.6349 20.7768C45.6349 21.3014 45.8025 21.7366 46.1378 22.0823C46.4731 22.4281 46.9132 22.7262 47.458 22.9765C48.0028 23.2269 48.6255 23.4564 49.326 23.6651C50.0265 23.8737 50.7419 24.1062 51.4724 24.3626C52.2028 24.6189 52.9183 24.9199 53.6188 25.2657C54.3193 25.6115 54.9419 26.0526 55.4868 26.5891C56.0316 27.1256 56.4716 27.7784 56.8069 28.5474C57.1422 29.3164 57.3098 30.2434 57.3098 31.3284C57.3098 32.5326 57.1003 33.6593 56.6812 34.7085C56.2621 35.7577 55.6544 36.6727 54.8581 37.4537C54.0618 38.2346 53.0799 38.8486 51.9124 39.2957C50.7449 39.7428 49.4188 39.9664 47.934 39.9664C47.1197 39.9664 46.2905 39.8829 45.4463 39.716C44.6021 39.5491 43.7849 39.3136 42.9946 39.0096C42.2043 38.7056 41.4619 38.3449 40.7674 37.9276C40.0728 37.5103 39.4681 37.0453 38.9532 36.5327L40.7494 33.707C40.8811 33.4924 41.0667 33.3195 41.3062 33.1883C41.5457 33.0572 41.8031 32.9916 42.0785 32.9916C42.4378 32.9916 42.8 33.1049 43.1652 33.3314C43.5304 33.5579 43.9435 33.8083 44.4045 34.0825C44.8656 34.3568 45.3954 34.6071 45.9941 34.8337C46.5928 35.0602 47.2993 35.1735 48.1136 35.1735C49.2152 35.1735 50.0714 34.932 50.6821 34.4492C51.2928 33.9663 51.5981 33.2003 51.5981 32.1511C51.5981 31.543 51.4305 31.0482 51.0952 30.6667C50.7599 30.2852 50.3198 29.9692 49.775 29.7188C49.2302 29.4685 48.6105 29.2479 47.916 29.0571C47.2215 28.8664 46.509 28.6547 45.7786 28.4222C45.0482 28.1897 44.3357 27.9036 43.6412 27.5638C42.9467 27.224 42.327 26.7769 41.7822 26.2225C41.2373 25.6681 40.7973 24.9766 40.462 24.1479C40.1267 23.3193 39.9591 22.297 39.9591 21.0808C39.9591 20.1032 40.1567 19.1494 40.5518 18.2194C40.947 17.2894 41.5277 16.4608 42.2941 15.7335C43.0604 15.0062 44.0004 14.425 45.114 13.9898C46.2276 13.5546 47.5029 13.337 48.9398 13.337C49.7421 13.337 50.5234 13.3996 51.2838 13.5248C52.0441 13.65 52.7656 13.8348 53.4481 14.0792C54.1307 14.3236 54.7683 14.6157 55.361 14.9555C55.9538 15.2953 56.4836 15.6798 56.9506 16.1091L55.4418 18.9169ZM71.212 34.9052C72.0263 34.9052 72.7537 34.7711 73.3943 34.5028C74.0349 34.2346 74.5768 33.8501 75.0198 33.3493C75.4629 32.8485 75.8011 32.2375 76.0346 31.5162C76.2681 30.7949 76.3849 29.9752 76.3849 29.0571V13.6232H82.4559V29.0571C82.4559 30.6548 82.1954 32.1212 81.6745 33.4566C81.1536 34.7919 80.4083 35.9425 79.4383 36.9082C78.4684 37.874 77.289 38.6251 75.8999 39.1616C74.5109 39.6981 72.9483 39.9664 71.212 39.9664C69.4637 39.9664 67.8951 39.6981 66.5061 39.1616C65.1171 38.6251 63.9376 37.874 62.9677 36.9082C61.9978 35.9425 61.2554 34.7919 60.7405 33.4566C60.2256 32.1212 59.9681 30.6548 59.9681 29.0571V13.6232H66.0391V29.0392C66.0391 29.9573 66.1558 30.777 66.3893 31.4983C66.6228 32.2196 66.9611 32.8336 67.4042 33.3404C67.8472 33.8471 68.389 34.2346 69.0297 34.5028C69.6703 34.7711 70.3977 34.9052 71.212 34.9052ZM92.4783 30.0407V39.6803H86.4074V13.6232H94.9211C96.813 13.6232 98.4266 13.8169 99.7617 14.2044C101.097 14.5919 102.187 15.1314 103.031 15.8229C103.875 16.5144 104.489 17.3311 104.872 18.273C105.255 19.2149 105.446 20.2403 105.446 21.3491C105.446 22.1956 105.333 22.9944 105.105 23.7456C104.878 24.4967 104.539 25.1912 104.09 25.829C103.641 26.4669 103.091 27.0362 102.438 27.537C101.785 28.0377 101.034 28.4491 100.184 28.771C100.591 28.9737 100.971 29.224 101.324 29.5221C101.678 29.8202 101.986 30.1838 102.249 30.613L107.817 39.6803H102.321C101.303 39.6803 100.573 39.2987 100.13 38.5357L95.7832 30.9707C95.5917 30.6369 95.3671 30.3984 95.1097 30.2554C94.8522 30.1123 94.49 30.0407 94.023 30.0407H92.4783ZM92.4783 25.8738H94.9211C95.7473 25.8738 96.4508 25.7694 97.0316 25.5608C97.6123 25.3521 98.0883 25.063 98.4595 24.6934C98.8307 24.3238 99.1001 23.8916 99.2678 23.3968C99.4354 22.902 99.5192 22.3685 99.5192 21.7962C99.5192 20.6516 99.145 19.7574 98.3966 19.1136C97.6482 18.4698 96.4897 18.1478 94.9211 18.1478H92.4783V25.8738Z"/>
                  <path class="fill-current" fill-rule="evenodd" clip-rule="evenodd" d="M138.316 13.9438V18.5935H127.576V25.1925H136.52V29.8601H127.576V40H121.469V13.9438H138.316ZM154.517 30.0926V40H148.446V30.0926L138.963 13.9438H144.315C144.842 13.9438 145.261 14.0661 145.572 14.3105C145.884 14.5549 146.135 14.8678 146.327 15.2493L150.027 22.8319C150.326 23.4399 150.601 24.0003 150.853 24.5129C151.104 25.0256 151.326 25.5323 151.517 26.033C151.697 25.5204 151.913 25.0077 152.164 24.4951C152.415 23.9824 152.685 23.428 152.972 22.8319L156.636 15.2493C156.708 15.0943 156.807 14.9394 156.933 14.7844C157.058 14.6294 157.202 14.4893 157.364 14.3641C157.525 14.2389 157.711 14.1376 157.92 14.0601C158.13 13.9826 158.361 13.9438 158.612 13.9438H164L154.517 30.0926Z"/>
                  <path class="fill-current" fill-rule="evenodd" clip-rule="evenodd" d="M8.62208 13.9438V40H2.13159V13.9438H8.62208Z"/>
                  <path class="fill-current" fill-rule="evenodd" clip-rule="evenodd" d="M10.325 7.4077C10.0297 8.042 9.63781 8.59701 9.14939 9.07273C8.66097 9.54846 8.08736 9.9279 7.42856 10.2111C6.76975 10.4942 6.06552 10.6358 5.31585 10.6358C4.58889 10.6358 3.9017 10.4942 3.25425 10.2111C2.60681 9.9279 2.04456 9.54846 1.56749 9.07273C1.09043 8.59701 0.709917 8.042 0.425949 7.4077C0.141982 6.7734 0 6.0938 0 5.36888C0 4.62131 0.141982 3.91906 0.425949 3.26211C0.709917 2.60515 1.09043 2.03882 1.56749 1.56309C2.04456 1.08737 2.60681 0.707924 3.25425 0.424753C3.9017 0.141583 4.58889 0 5.31585 0C6.06552 0 6.76975 0.141583 7.42856 0.424753C8.08736 0.707924 8.66097 1.08737 9.14939 1.56309C9.63781 2.03882 10.0297 2.60515 10.325 3.26211C10.6203 3.91906 10.768 4.62131 10.768 5.36888C10.768 6.0938 10.6203 6.7734 10.325 7.4077Z"/>
                  <path class="fill-current" fill-rule="evenodd" clip-rule="evenodd" d="M116.39 13.9438V40H109.899V13.9438H116.39Z"/>
                  <path class="fill-current" fill-rule="evenodd" clip-rule="evenodd" d="M118.091 7.40604C117.796 8.04019 117.404 8.59508 116.916 9.07069C116.427 9.54631 115.854 9.92567 115.195 10.2088C114.537 10.4919 113.832 10.6334 113.083 10.6334C112.356 10.6334 111.669 10.4919 111.022 10.2088C110.375 9.92567 109.812 9.54631 109.335 9.07069C108.858 8.59508 108.478 8.04019 108.194 7.40604C107.91 6.77188 107.768 6.09243 107.768 5.36768C107.768 4.62028 107.91 3.91818 108.194 3.26137C108.478 2.60457 108.858 2.03836 109.335 1.56274C109.812 1.08712 110.375 0.707765 111.022 0.424658C111.669 0.141551 112.356 0 113.083 0C113.832 0 114.537 0.141551 115.195 0.424658C115.854 0.707765 116.427 1.08712 116.916 1.56274C117.404 2.03836 117.796 2.60457 118.091 3.26137C118.386 3.91818 118.534 4.62028 118.534 5.36768C118.534 6.09243 118.386 6.77188 118.091 7.40604Z"/>
                  </svg>
                  `}
                  heading="Insurify" 
                  bulletColorClassName="bg-electric-lime"
                  bullets={['Series B', 'Consumer Insurtech']}
                  description="Partnering from series A to a 125m series B, on everything from brand, web, and web app experiences to help save consumers money on their auto insurance."
                />
              </div>
              <div className="flex w-full px-4 sm:px-3 sm:w-1/2 md:w-1/3">
                <PartnerCard
                  logo={`<svg width="208" height="64" viewBox="0 0 208 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current" d="M64.1228 58.6665C59.4828 58.6665 55.6357 57.1385 52.5816 54.0825C49.5273 50.997 48.0002 47.1917 48.0002 42.6665C48.0002 38.1413 49.5273 34.3506 52.5816 31.2946C55.6357 28.2092 59.4828 26.6665 64.1228 26.6665C66.9126 26.6665 69.4822 27.3277 71.8317 28.65C74.2104 29.9722 76.0605 31.7648 77.3821 34.0274L72.977 36.5838C72.1546 35.0558 70.9506 33.851 69.3648 32.9696C67.8084 32.0586 66.061 31.6032 64.1228 31.6032C60.8337 31.6032 58.1613 32.6462 56.1056 34.7326C54.0792 36.8189 53.0661 39.4636 53.0661 42.6665C53.0661 45.8694 54.0792 48.5141 56.1056 50.6004C58.1613 52.6868 60.8337 53.7298 64.1228 53.7298C66.061 53.7298 67.823 53.289 69.4089 52.4076C70.9946 51.4966 72.1841 50.2772 72.977 48.7492L77.3821 51.2616C76.0898 53.5242 74.2545 55.3313 71.8757 56.683C69.5264 58.0053 66.942 58.6665 64.1228 58.6665Z"/>
                  <path class="fill-current" d="M98.6831 36.0552H103.441V58.0938H98.6831V54.9203C96.8917 57.418 94.322 58.6668 90.9741 58.6668C87.9493 58.6668 85.3651 57.5502 83.2213 55.317C81.0775 53.0543 80.0056 50.3068 80.0056 47.0746C80.0056 43.8128 81.0775 41.0654 83.2213 38.8322C85.3651 36.5988 87.9493 35.4823 90.9741 35.4823C94.322 35.4823 96.8917 36.7164 98.6831 39.1847V36.0552ZM86.7453 52.1434C88.0668 53.4658 89.7261 54.1268 91.7231 54.1268C93.72 54.1268 95.3792 53.4658 96.7008 52.1434C98.0223 50.7918 98.6831 49.102 98.6831 47.0746C98.6831 45.047 98.0223 43.372 96.7008 42.0498C95.3792 40.698 93.72 40.0222 91.7231 40.0222C89.7261 40.0222 88.0668 40.698 86.7453 42.0498C85.4239 43.372 84.7631 45.047 84.7631 47.0746C84.7631 49.102 85.4239 50.7918 86.7453 52.1434Z"/>
                  <path class="fill-current" d="M113.743 39.7574C114.947 37.0246 117.209 35.6582 120.527 35.6582V40.8153C118.706 40.6977 117.121 41.1385 115.77 42.1375C114.419 43.1073 113.743 44.7234 113.743 46.9861V58.0934H108.986V36.0549H113.743V39.7574Z"/>
                  <path class="fill-current" d="M128.536 31.8676C127.948 32.4553 127.243 32.7492 126.421 32.7492C125.599 32.7492 124.879 32.4553 124.263 31.8676C123.675 31.2505 123.382 30.5306 123.382 29.7078C123.382 28.885 123.675 28.1798 124.263 27.5921C124.85 26.975 125.569 26.6665 126.421 26.6665C127.273 26.6665 127.992 26.975 128.58 27.5921C129.167 28.1798 129.461 28.885 129.461 29.7078C129.461 30.5306 129.152 31.2505 128.536 31.8676ZM124.042 58.0934V36.0549H128.8V58.0934H124.042Z"/>
                  <path class="fill-current" d="M146.79 35.4821C149.815 35.4821 152.399 36.5987 154.543 38.832C156.687 41.0652 157.759 43.8127 157.759 47.0744C157.759 50.3067 156.687 53.0541 154.543 55.3168C152.399 57.55 149.815 58.6667 146.79 58.6667C143.442 58.6667 140.872 57.4179 139.082 54.9201V58.0936H134.324V27.2397H139.082V39.1845C140.872 36.7163 143.442 35.4821 146.79 35.4821ZM141.063 52.1432C142.386 53.4656 144.044 54.1267 146.042 54.1267C148.038 54.1267 149.698 53.4656 151.019 52.1432C152.34 50.7916 153.002 49.1019 153.002 47.0744C153.002 45.0468 152.34 43.3719 151.019 42.0496C149.698 40.6979 148.038 40.022 146.042 40.022C144.044 40.022 142.386 40.6979 141.063 42.0496C139.742 43.3719 139.082 45.0468 139.082 47.0744C139.082 49.1019 139.742 50.7916 141.063 52.1432Z"/>
                  <path class="fill-current" d="M172.467 58.6668C169.236 58.6668 166.491 57.5502 164.229 55.317C161.968 53.0838 160.837 50.3363 160.837 47.0746C160.837 43.8128 161.968 41.0654 164.229 38.8322C166.491 36.5988 169.236 35.4823 172.467 35.4823C175.725 35.4823 178.472 36.5988 180.704 38.8322C182.965 41.0654 184.096 43.8128 184.096 47.0746C184.096 50.3363 182.965 53.0838 180.704 55.317C178.472 57.5502 175.725 58.6668 172.467 58.6668ZM167.576 52.0552C168.899 53.3776 170.528 54.0387 172.467 54.0387C174.404 54.0387 176.035 53.3776 177.356 52.0552C178.677 50.733 179.339 49.0727 179.339 47.0746C179.339 45.0764 178.677 43.4162 177.356 42.0938C176.035 40.7715 174.404 40.1103 172.467 40.1103C170.528 40.1103 168.899 40.7715 167.576 42.0938C166.255 43.4162 165.595 45.0764 165.595 47.0746C165.595 49.0727 166.255 50.733 167.576 52.0552Z"/>
                  <path class="fill-current" d="M203.243 36.0549H208V58.0935H203.243V55.2725C201.804 57.5352 199.528 58.6665 196.415 58.6665C193.889 58.6665 191.848 57.8584 190.292 56.2423C188.735 54.6261 187.957 52.4076 187.957 49.5867V36.0549H192.715V49.1017C192.715 50.7473 193.155 52.0109 194.036 52.8924C194.917 53.774 196.121 54.2148 197.648 54.2148C199.323 54.2148 200.673 53.7005 201.701 52.672C202.728 51.6141 203.243 50.0127 203.243 47.8676V36.0549Z"/>
                  <path class="fill-current" fill-rule="evenodd" clip-rule="evenodd" d="M19.7725 7.87497C17.4119 12.5745 17.286 17.9727 19.3633 22.5771C16.9712 19.5128 14.7837 16.512 14.0283 12.5269C13.3831 9.17688 13.2257 5.19176 14.4217 0C9.60603 8.3354 9.84209 15.48 13.8552 21.2116C17.9312 27.0225 24.4151 30.8331 33.0708 34.7705C32.6481 34.3673 32.162 33.9372 31.6288 33.4653C29.2436 31.3549 25.9187 28.4129 23.1404 23.3391C20.8584 19.1635 20.0401 14.5275 19.7725 7.87497ZM18.6687 29.4519L18.6692 29.4516C11.7589 25.6463 8.81208 22.1036 7.16601 20.1247C7.09513 20.0395 7.02667 19.9572 6.9604 19.8779C4.9932 28.6419 10.7846 30.5631 14.6089 30.8171H14.6357L14.6353 30.8172H14.6083C9.16299 33.1669 5.74792 35.9455 3.07252 40.4068C-1.00352 47.1704 -0.137947 52.902 0.711884 55.8551C1.54597 58.7288 4.11121 62.7299 5.70071 64C0.963687 53.0608 2.80499 46.5353 5.73219 42.0739C8.29741 38.1523 11.3033 35.5961 16.4809 33.4528C17.016 33.2304 17.5984 33.0081 18.2279 32.77C18.3155 32.8143 18.4099 32.8584 18.5112 32.9059C18.628 32.9605 18.7539 33.0195 18.8888 33.0876C22.776 34.9135 27.2927 36.8187 30.5976 38.2L30.7551 38.2635L29.5117 39.5495C29.1969 39.8829 28.7405 40.0257 28.3 39.9464C26.6003 39.6448 24.3497 39.5812 23.2639 39.5812C13.0974 39.5812 7.9984 43.4711 6.50333 49.1551C5.5276 52.8703 6.81808 56.7443 8.94265 59.3163C11.6023 62.5393 15.9459 63.9841 20.1007 63.9841H28.1425C24.8219 62.2695 21.6429 60.2055 19.7229 58.0303C17.6456 55.6805 15.9931 52.4416 16.5912 48.8216C17.0948 45.7097 19.3452 42.9631 22.8861 42.7408H23.2796C23.9564 42.7408 24.6488 42.7725 25.3097 42.8201H25.3571C26.6947 42.9313 28.0324 43.1536 29.2284 43.4711C30.456 43.7887 31.7623 43.4235 32.6435 42.5027L37.3333 37.6443L36.5464 37.3585C36.5333 37.3519 36.3292 37.2663 35.9708 37.1159C33.7388 36.1795 25.524 32.7331 20.1951 30.2297C19.6757 29.9916 19.1565 29.7217 18.6687 29.4519Z"/>
                  </svg>
                  `}
                  heading="Caribou" 
                  bulletColorClassName="bg-voltage"
                  bullets={['Series B', 'Consumer Fintech']}
                  description="After a $65M injection from JP Morgan chase, a new brand, web ecosystem, and suite of web apps hit the market. "
                />
              </div>
              <div className="flex w-full px-4 sm:px-3 sm:w-1/2 md:w-1/3">
                <PartnerCard
                  logo={`<svg width="88" height="64" viewBox="0 0 88 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current" d="M82.1196 9.69761C82.1196 8.85294 82.1196 8.14904 82.1196 7.30437C82.1196 6.45969 81.9774 6.17814 80.9822 6.45969C79.9871 6.74125 78.9919 7.02281 77.9968 7.30437C77.4281 7.44515 76.7173 7.44515 76.7173 8.28982C76.7173 10.1199 76.7173 11.9501 76.7173 13.921C76.7173 14.2025 76.8595 14.3433 77.2859 14.3433C77.5703 14.3433 77.9968 14.2025 78.2811 14.2025C79.2763 13.921 80.2714 13.6394 81.2666 13.3579C81.9774 13.2171 82.1196 12.7947 82.1196 12.0909C82.1196 11.2462 82.1196 10.4015 82.1196 9.69761ZM76.8724 27.423C77.5832 27.2822 78.294 27.1414 79.0049 27.0006C79.8578 26.8598 80.7108 26.5783 81.5638 26.2967C81.8481 26.1559 82.1325 25.7336 82.1325 25.3113C82.2746 24.8889 82.1325 24.3258 82.1325 23.9035C82.1325 23.0588 82.4168 22.6365 83.2698 22.3549C84.5493 21.9326 85.8288 21.651 87.1082 21.3695C87.6769 21.2287 87.9612 21.5102 87.9612 22.0734C87.9612 23.6219 87.9612 25.3113 87.8191 26.8598C87.5347 28.9715 86.1131 30.3793 84.1228 31.224C80.7108 32.491 77.1567 33.8988 73.7448 35.3066C71.4701 36.1513 69.3376 36.9959 67.063 37.9814C64.7884 38.826 62.3716 39.8115 60.0969 40.6562C56.9693 41.9232 53.6995 43.1902 50.5719 44.4572C48.2973 45.3019 46.0226 46.2873 43.748 47.132C40.6204 48.399 37.4927 49.666 34.2229 50.7923C31.9483 51.7777 29.6737 52.6224 27.399 53.6078C24.2714 54.8748 21.0016 56.0011 17.874 57.2681C15.4572 58.2535 12.8982 59.239 10.4814 60.2244C7.53473 61.4787 4.54927 62.6049 1.56381 63.7311C1.42165 63.7311 1.42165 63.8719 1.27948 63.8719C0.426494 64.1535 0 64.0127 0 63.0272C0 58.5223 0 53.8766 0 49.3845C0 48.399 0.28433 48.1175 1.13732 47.8359C3.26979 47.2728 5.40226 46.7097 7.53473 46.1466C8.38772 45.865 9.38288 45.7242 10.2359 45.4427C10.9467 45.3019 11.231 44.8795 11.231 44.1756C11.231 43.0494 11.231 41.9232 11.231 40.6562C11.231 40.2338 11.0889 39.9523 10.6624 39.9523C8.24556 39.3892 5.82876 38.9668 3.41195 38.4037C1.70598 37.9814 0.710824 36.7144 0.284329 35.025C0.142165 34.4619 0 33.8988 0 33.1949C0 31.0832 0 29.1123 0 27.0006C0 24.6074 1.56381 22.2141 3.98061 21.5102C5.40226 20.9471 6.82391 20.6656 8.24556 20.384C9.66721 19.9617 11.0889 19.5393 12.5105 19.117C15.0695 18.5539 16.9176 19.6801 17.0598 22.3549C17.0598 23.7627 17.0598 25.1705 17.0598 26.5783C17.0598 27.9861 16.7754 28.2676 15.496 28.69C14.3586 28.9715 13.3635 29.2531 12.2262 29.5346C11.6575 29.6754 11.231 29.2531 11.231 28.69C11.231 27.8453 11.231 27.0006 11.231 26.0152C11.231 25.5928 10.9467 25.3113 10.378 25.4521C9.38288 25.5928 8.38772 25.8744 7.39257 26.1559C7.39257 26.1559 7.2504 26.1559 7.2504 26.2967C5.68659 26.7191 5.68659 26.8598 5.68659 28.4084C5.68659 29.3939 5.68659 30.3793 5.68659 31.5055C5.68659 32.2094 5.82876 32.3502 6.53958 32.491C8.52989 32.9133 10.5202 33.3357 12.3683 33.758C13.2213 33.8988 13.9321 34.0396 14.643 34.4619C16.349 35.3066 16.9176 36.8551 17.0598 38.6853C17.0598 40.6562 17.0598 42.6271 17.0598 44.7388C17.0598 45.1611 16.9176 45.5834 16.7754 46.1466C17.2019 46.0058 17.6284 46.0058 17.9128 45.865C19.1922 45.5834 20.3296 45.1611 21.609 44.8795C21.7512 44.7388 21.8934 44.598 21.8934 44.3164C22.0355 44.3164 21.8934 44.1756 21.8934 44.0349C21.8934 35.3066 21.8934 26.7319 21.8934 18.0036C21.8934 17.0181 22.0355 16.5958 23.1729 16.3142C24.3102 16.0327 25.3053 15.7511 26.4427 15.4695C27.2956 15.188 27.58 15.4695 27.58 16.455C27.58 24.3386 27.58 32.2094 27.58 40.0931V40.797C28.2908 40.6562 29.0016 40.3746 29.7124 40.2338C30.8498 39.9523 32.1292 39.5299 33.2666 39.2484C33.9774 39.1076 34.4039 39.3892 34.4039 40.0931C34.4039 40.5154 34.4039 40.9377 34.4039 41.3601C35.2569 41.2193 35.8255 41.0785 36.5364 40.797H36.6785C36.9628 40.6562 37.5315 40.6562 37.6737 40.3746C37.8158 40.0931 37.6737 39.5299 37.6737 39.1076C37.6737 34.0396 37.6737 28.8307 37.6737 23.7755C37.6737 22.79 38.1002 22.3677 39.0953 22.0862C40.0905 21.8046 41.0856 21.523 42.2229 21.2415C43.0759 20.9599 43.5024 21.2415 43.5024 22.2269C43.5024 27.5765 43.5024 32.9261 43.5024 38.2629C43.5024 38.4037 43.5024 38.6853 43.5024 38.9668C44.3554 38.826 45.2084 38.5445 46.0614 38.4037C46.7722 38.1222 47.483 37.8406 48.1939 37.6998C48.7625 37.6998 48.9047 37.4183 48.9047 36.8551C48.9047 29.3939 48.9047 21.9454 48.9047 14.3433C48.9047 13.0763 49.189 11.8093 49.8998 10.6831C50.7528 9.41605 51.8901 8.57138 53.3118 8.28982C54.7334 7.86748 56.2973 7.44515 57.7189 7.02281C58.8562 6.74125 59.9935 6.45969 61.273 6.17814C61.6995 6.03736 62.2682 6.03736 62.8368 5.89658C64.5428 5.7558 65.8223 7.44515 65.8223 8.71216C65.9645 11.1054 65.9645 13.4986 65.9645 16.0327C65.9645 16.5958 65.3958 17.0181 64.5428 17.2997C63.5477 17.5812 62.4103 17.8628 61.4152 18.1443C60.5622 18.2851 60.1357 18.1443 60.1357 17.1589C60.1357 16.0327 60.1357 14.7656 60.1357 13.6394C60.1357 13.2171 60.1357 12.7947 60.1357 12.2316C59.2827 12.3724 58.5719 12.5132 57.8611 12.654C57.1502 12.7947 56.4394 13.0763 55.8708 13.2171C55.0178 13.3579 54.5913 13.7802 54.5913 14.6249C54.5913 20.6784 54.5913 26.5783 54.5913 32.491C54.5913 33.3357 54.8756 33.4764 55.5864 33.3357C56.8659 32.9133 58.0032 32.6318 59.1406 32.3502C59.7092 32.2094 60.1357 31.9279 60.1357 31.3648C60.1357 30.9424 60.1357 30.3793 60.1357 29.957C60.2779 28.69 60.42 28.4084 61.6995 28.1269C62.6947 27.8453 63.6898 27.5637 64.685 27.2822C65.538 27.1414 65.9645 27.2822 65.9645 28.2676C65.9645 29.5346 65.9645 30.9424 65.9645 32.2094C65.9645 32.491 65.9645 32.7726 65.9645 33.0541C67.1018 32.6318 68.2391 32.3502 69.3764 32.0687C69.8029 31.9279 70.0872 31.7871 70.5137 31.7871C70.9402 31.7871 70.9402 31.5055 70.9402 31.224C70.9402 30.9424 71.0824 30.8016 71.0824 30.6609C71.0824 23.0588 70.9402 15.4695 71.0824 7.86748C71.0824 5.47424 72.3619 3.64411 74.4943 2.65866C75.7738 2.09555 77.3376 1.81399 78.6171 1.53243C80.4653 0.969316 82.1712 0.546979 83.8772 0.124642C86.0097 -0.438474 88 0.969316 88 3.081C88 6.45969 88 9.83839 88 13.2171C87.8578 15.4695 86.0097 17.8628 83.5929 18.4259C81.7448 18.8482 80.0388 19.4114 78.3328 19.8337C78.1906 19.8337 78.0485 19.8337 77.7641 19.9745C77.3376 20.1152 76.769 20.256 76.769 20.9599C76.769 22.9308 76.769 24.9017 76.769 26.8726C76.7302 27.0006 76.7302 27.1414 76.8724 27.423ZM43.4766 13.7802C43.4766 14.3433 43.4766 14.9064 43.4766 15.4695C43.4766 16.1734 43.1922 16.5958 42.4814 16.7366C41.3441 17.1589 40.2068 17.4404 39.0695 17.722C38.0743 18.0036 37.6478 17.722 37.6478 16.5958C37.6478 15.7511 37.79 14.9064 37.6478 14.0618C37.6478 12.3724 38.2165 12.3724 39.496 11.9501C40.4911 11.6685 41.3441 11.387 42.3393 11.1054C42.9079 10.9646 43.4766 11.387 43.4766 11.9501C43.4766 12.5132 43.4766 13.2171 43.4766 13.7802Z"/>
                  </svg>
                  `}
                  heading="Slice" 
                  bulletColorClassName="bg-summer-rain"
                  bullets={['Series D', 'Food Tech']}
                  description="A fully integrated partner, our teams span across consumer applications, b2b web apps, and the core product suite used by xxxx small businesses to excel their consumer experiences. "
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      <div className="h-screen w-full hidden md:block" />
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        id="section-4"
      >
        <div
          className="background fixed z-0 inset-0 justify-center items-center overflow-hidden hidden md:flex"
          style={{ backgroundColor: '#010c0e' }}
        >
          <canvas className="opacity-0 transition-opacity duration-300 ease-out absolute aspect-video bottom-0 left-0 w-2/3 transform -scale-x-100" />
        </div>
        <div className="foreground relative z-40 w-full">
          <div className="container pt-10 md:py-20">
            <div className="max-w-[63.5rem] mx-auto">
              <div className="border-b border-slate py-10 md:py-20">
                <div className="flex flex-wrap justify-between -mx-4 sm:-mx-3">
                  <div className="w-full px-4 sm:px-3 md:w-1/2">
                    <h2 className="font-serif font-light tracking-tight text-4xl mb-10 md:mb-0 md:text-6xl">
                      Are you building a design team? 
                    </h2>
                  </div>
                  <div className="w-full px-4 sm:px-3 md:w-5/12">
                    <p className="pb-6 text-lg font-light leading-relaxed">
                      We’re helping partners build world class design organizations with our handbuilt pipeline. Interested? 
                    </p>
                    <button className="transition-color duration-500 ease-out text-electric-lime">
                      <svg className="inline-block mr-4" width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M1 5.50374C0.723858 5.50374 0.5 5.27988 0.5 5.00374C0.5 4.72759 0.723858 4.50374 1 4.50374L1 5.50374ZM8.42212 9.59843C8.22685 9.79369 7.91027 9.79369 7.71501 9.59843C7.51975 9.40316 7.51975 9.08658 7.71501 8.89132L8.42212 9.59843ZM11.9635 4.64285C12.1587 4.44757 12.4753 4.44755 12.6706 4.6428C12.8659 4.83805 12.8659 5.15463 12.6706 5.34991L11.9635 4.64285ZM7.71501 1.1088C7.51975 0.913534 7.51975 0.596951 7.71501 0.401689C7.91027 0.206427 8.22685 0.206427 8.42212 0.401689L7.71501 1.1088ZM12.6706 4.65018C12.8659 4.84544 12.8659 5.16203 12.6706 5.35729C12.4753 5.55255 12.1588 5.55255 11.9635 5.35729L12.6706 4.65018ZM1 4.50374L12.3097 4.50373V5.50373L1 5.50374L1 4.50374ZM7.71501 8.89132L11.9561 4.65018L12.6633 5.35729L8.42212 9.59843L7.71501 8.89132ZM11.9563 4.65007L11.9599 4.64639L12.6668 5.35373L12.6631 5.3574L11.9563 4.65007ZM11.9598 4.64653L11.9635 4.64285L12.6706 5.34991L12.667 5.35359L11.9598 4.64653ZM8.42212 0.401689L12.6669 4.6465L11.9598 5.35361L7.71501 1.1088L8.42212 0.401689ZM12.6669 4.6465L12.6706 4.65018L11.9635 5.35729L11.9598 5.35361L12.6669 4.6465Z"/>
                      </svg>
                      Let’s chat pipeline
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden border-b border-slate py-10 md:py-20">
                <div className="flex flex-wrap justify-between -mx-4 sm:-mx-3">
                  <div className="w-full px-4 sm:px-3 md:w-1/2">
                    <h2 className="font-serif font-light tracking-tight text-4xl mb-10 md:mb-0 md:text-6xl">
                      Let’s be fearless together
                    </h2>
                  </div>
                  <div className="w-full px-4 sm:px-3 md:w-5/12">
                    <p className="pb-6 text-lg font-light leading-relaxed">
                      Scaling products and design operations is hard. We’re here to make it easy. 
                    </p>
                    <button className="transition-color duration-500 ease-out text-electric-lime">
                      <svg className="inline-block mr-4" width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M1 5.50374C0.723858 5.50374 0.5 5.27988 0.5 5.00374C0.5 4.72759 0.723858 4.50374 1 4.50374L1 5.50374ZM8.42212 9.59843C8.22685 9.79369 7.91027 9.79369 7.71501 9.59843C7.51975 9.40316 7.51975 9.08658 7.71501 8.89132L8.42212 9.59843ZM11.9635 4.64285C12.1587 4.44757 12.4753 4.44755 12.6706 4.6428C12.8659 4.83805 12.8659 5.15463 12.6706 5.34991L11.9635 4.64285ZM7.71501 1.1088C7.51975 0.913534 7.51975 0.596951 7.71501 0.401689C7.91027 0.206427 8.22685 0.206427 8.42212 0.401689L7.71501 1.1088ZM12.6706 4.65018C12.8659 4.84544 12.8659 5.16203 12.6706 5.35729C12.4753 5.55255 12.1588 5.55255 11.9635 5.35729L12.6706 4.65018ZM1 4.50374L12.3097 4.50373V5.50373L1 5.50374L1 4.50374ZM7.71501 8.89132L11.9561 4.65018L12.6633 5.35729L8.42212 9.59843L7.71501 8.89132ZM11.9563 4.65007L11.9599 4.64639L12.6668 5.35373L12.6631 5.3574L11.9563 4.65007ZM11.9598 4.64653L11.9635 4.64285L12.6706 5.34991L12.667 5.35359L11.9598 4.64653ZM8.42212 0.401689L12.6669 4.6465L11.9598 5.35361L7.71501 1.1088L8.42212 0.401689ZM12.6669 4.6465L12.6706 4.65018L11.9635 5.35729L11.9598 5.35361L12.6669 4.6465Z"/>
                      </svg>
                      Let’s chat pipeline
                    </button>
                  </div>
                </div>
              </div>
              <div className="py-10 flex flex-wrap justify-between -mx-4 sm:-mx-3 md:py-20">
                <div className="w-full px-4 sm:px-3 md:w-1/2">
                  <Link to="/" title="Logo">
                    <img src={settings.header.logo.image} alt={settings.header.logo.alt} className="h-16 w-auto mb-10 md:mb-0 md:h-20" />
                  </Link>
                </div>
                <div className="w-full px-4 sm:px-3 md:w-5/12">
                  <h3 className="font-light text-3xl leading-normal tracking-tighter mb-2">
                    Zach Greenberger
                  </h3>
                  <h4 className="text-lg font-light leading-relaxed mb-10">
                    Head of Growth
                  </h4>
                  <ul className="mb-10">
                    <li className="border-b border-slate">
                      <a className="group flex flex-wrap justify-start items-center space-x-4 py-4" href="mailto:zach@bloomgrowthagency.com">
                        <img src={arrowIcon} alt="Arrow icon" className="block w-8 h-8 p-2 rounded-full bg-summer-rain" />
                        <span className="transition-color duration-500 ease-out group-hover:text-summer-rain">
                          zach@bloomgrowthagency.com
                        </span>
                      </a>
                    </li>
                    <li className="border-b border-slate">
                      <a className="group flex flex-wrap justify-start items-center space-x-4 py-4" href="tel:+14136363186">
                        <img src={arrowIcon} alt="Arrow icon" className="block w-8 h-8 p-2 rounded-full bg-voltage" />
                        <span className="transition-color duration-500 ease-out group-hover:text-voltage">
                          +1 413.636.3186
                        </span>
                      </a>
                    </li>
                    <li className="border-b border-slate">
                      <button className="group flex flex-wrap justify-start items-center space-x-4 py-4">
                        <img src={arrowIcon} alt="Arrow icon" className="block w-8 h-8 p-2 rounded-full bg-electric-lime" />
                        <span className="transition-color duration-500 ease-out group-hover:text-electric-lime">
                          MA / NYC / SF
                        </span>
                      </button>
                    </li>
                  </ul>
                  <nav className="flex flex-wrap space-x-6 text-lg font-light leading-relaxed mb-10">
                    <button>
                      Careers
                    </button>
                    <button>
                      Dribble
                    </button>
                    <button>
                      LinkedIn
                    </button>
                  </nav>
                  <p className="text-sm font-light leading-relaxed">
                    Copyright © 2022 Bloom Growth Agency
                  </p>
                </div>
              </div>
            </div>
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
          url: PropTypes.string,
          colorClassName: PropTypes.string,
          fontClassName: PropTypes.string,
        }),
      ),
    }),
  ),
  numberedList: PropTypes.arrayOf(
    PropTypes.shape({
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
            url
            colorClassName
            fontClassName
          }
        }
        numberedList {
          text
        }
        accordionHeading
        accordionItems {
          heading
          body
        }
        partnersHeading
        partnersSubheading
      }
    }
  }
`;
