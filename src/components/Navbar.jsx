import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const navItems = ["Games", "Videos", "Prologue", "About", "Contact"];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(new Audio("/audio/loop.mp3"));
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
      audioElementRef.current.loop = true;
      audioElementRef.current.volume = 0.2;
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 340 340"
            >
              {/* <!-- Circular Background --> */}
              <circle cx="170" cy="170" r="160" fill="orange" />

              {/* <!-- Existing Paths Adjusted --> */}
              <path
                fill="black"
                d="M127.423 64.013l62.975.149c13.161-.099 22.989 2.002 29.48 6.303 7.928 5.272 11.89 14.343 11.89 27.213 0 21.19-9.828 33.195-29.482 36.012v.297c8.667 2.159 13.048 9.335 13.146 21.528 0 6.245-.233 14.245-.7 24 0 6.542 1.384 12.202 4.156 16.98H184.38c-1.611-1.747-2.416-5.305-2.416-10.677.66-8.98.99-16.347.99-22.098 0-11.617-5.582-17.425-16.746-17.425h-22.329l-9.738 46.987h-33.613l26.895-129.269zm53.236 26.941h-24.744l-6.453 31.192h26.775c14.967 0 22.497-5.906 22.595-17.721.001-8.98-6.058-13.47-18.173-13.47z"
              />
              <path
                fill="black"
                d="M223.456 196.346l24.915-43.18 6.717 43.478h42.506l-38.349 27.534 6.14 43.18-33.204-26.05-44.633 27.089 20.878-45.973-24.333-26.2 39.363.122z"
              />
              <path
                fill="white"
                d="M252.503 221.088l25.47-18.142h-28.177l-4.881-31.464-17.882 31.168h-28.467l17.302 18.587-14.305 31.193 31.052-18.735 24.48 19.18-4.592-31.787z"
              />
              <path
                fill="white"
                d="M337.024 310.233c1.38 0 2.726.362 4.04 1.086 1.315.723 2.339 1.76 3.07 3.108.735 1.348 1.101 2.753 1.101 4.216 0 1.449-.36 2.841-1.084 4.177a7.735 7.735 0 0 1-3.039 3.114c-1.302.74-2.665 1.108-4.09 1.108-1.421 0-2.784-.37-4.089-1.108a7.762 7.762 0 0 1-3.044-3.114c-.725-1.336-1.089-2.73-1.089-4.177 0-1.463.369-2.868 1.106-4.216.738-1.348 1.763-2.384 3.077-3.108 1.316-.725 2.662-1.086 4.04-1.086zm0 1.391c-1.154 0-2.278.303-3.37.909a6.451 6.451 0 0 0-2.566 2.594c-.617 1.126-.926 2.297-.926 3.514 0 1.211.304 2.372.91 3.482a6.542 6.542 0 0 0 2.542 2.596c1.089.619 2.224.93 3.409.93 1.183 0 2.32-.311 3.41-.93a6.498 6.498 0 0 0 2.536-2.596c.603-1.11.904-2.27.904-3.482 0-1.218-.308-2.388-.92-3.514a6.39 6.39 0 0 0-2.565-2.594c-1.094-.606-2.216-.909-3.364-.909zm-3.604 11.664v-9.045h3.038c1.039 0 1.79.083 2.254.25.466.167.835.459 1.11.875.277.416.415.857.415 1.325 0 .661-.23 1.237-.692 1.726-.46.49-1.072.764-1.835.824.312.135.563.294.75.48.358.356.792.954 1.308 1.792l1.078 1.772h-1.742l-.783-1.426c-.617-1.12-1.115-1.823-1.492-2.105-.262-.209-.643-.313-1.145-.313h-.838v3.844h-1.426zm1.426-5.092h1.732c.829 0 1.393-.126 1.694-.38.3-.25.451-.586.451-1.002a1.24 1.24 0 0 0-.218-.718 1.302 1.302 0 0 0-.604-.473c-.258-.103-.734-.157-1.431-.157h-1.624v2.73z"
              />
            </svg>
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              fontFamily={"Roboto Mono"}
              fontWeight={"font-semibold"}
              fontSize={"text-xs"}
            />
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              {/* <audio
                ref={audioElementRef}
                className="hidden"
                src=""
                autoPlay
                loop
              /> */}
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.3}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
