import { useEffect, useRef, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { RiFullscreenFill } from "react-icons/ri";
import copy from "copy-to-clipboard";
import { useAppContext } from "../context/AppContext";

function Trailer() {
  const {
    videoInfo: { src, trailerLink },
    setIsTrailerOpen: onCloseTrailer,
  } = useAppContext(); // Get video info and onCloseTrailer function
  const containerRef = useRef(null); // Ref for the container
  const control = useRef(null); // Ref for the control bars
  const [copied, setCopied] = useState(false); // State to show "Copied" text
  const hoverAudioRef = useRef(new Audio("/audio/button-hover.mov"));
  const clickAudioRef = useRef(new Audio("/audio/button-click.mov"));

  function handleMouseEnter() {
    console.log("Mouse enter");
    if (hoverAudioRef.current) {
      hoverAudioRef.current.currentTime = 0; // Restart audio from beginning
      hoverAudioRef.current
        .play()
        .catch((err) => console.error("Audio play error:", err));
    }
  }

  function handleMouseLeave() {
    console.log("Mouse leave");
    if (hoverAudioRef.current) {
      hoverAudioRef.current.pause();
      hoverAudioRef.current.currentTime = 0; // Reset audio
    }
  }

  // Function to toggle full-screen mode
  const handleFullScreen = () => {
    clickAudioRef.current.play();
    if (containerRef.current) {
      control.current.style.display = "none"; // Hide the control bars
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen(); // Firefox
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen(); // Chrome, Safari, Opera
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen(); // IE/Edge
      }
    }
  };

  const handleCopy = () => {
    clickAudioRef.current.play();
    copy(trailerLink); // Copy text to clipboard
    setCopied(true);

    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Listen for fullscreen change
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        control.current.style.display = "block"; // Show the control bars
      }
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("msfullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed w-dvh  top-0 left-0 z-50 bg-black flex items-center justify-center"
    >
      <video
        src={src}
        className="h-full w-full object-cover"
        autoPlay
        playsInline // Ensures fullscreen works correctly on mobile
      />
      {/* control bars */}

      <div ref={control}>
        {/* Fullscreen Button */}
        <div className="absolute top-10 left-10 flex flex-col gap-6">
          <div
            className="flex gap-4 items-center group cursor-pointer w-[150px]"
            onClick={handleFullScreen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} // Make the container fullscreen
          >
            <button className="bg-none border border-white/20 size-[50px] rounded-full flex items-center justify-center group-hover:scale-[1.1] group-hover:border-white/60 transition-all">
              <RiFullscreenFill className="text-white text-2xl" />
            </button>
            <span className="text-white text-xs uppercase font-robotoMono animate-slide hidden group-hover:block tracking-wide">
              Fullscreen
            </span>
          </div>
          {/* Copy Link Button */}
          <div className="flex gap-4 items-center group cursor-pointer w-[150px]">
            <button
              className="bg-none border border-white/20 size-[50px] rounded-full flex items-center justify-center group-hover:scale-[1.1] group-hover:border-white/60 transition-all"
              onClick={handleCopy}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <AiOutlineLink className="text-white text-2xl" />
            </button>
            <span className="text-white text-xs uppercase font-robotoMono animate-slide hidden group-hover:block tracking-wide">
              {copied ? "Copied" : "Copy link"}
            </span>
          </div>
        </div>
        {/* Close Button */}
        <div
          className="absolute top-10 right-10 group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="bg-none border border-white/20 size-[50px] rounded-full flex items-center justify-center group-hover:scale-[1.1] group-hover:border-white/60 transition-all"
            onClick={() => {
              clickAudioRef.current.play();
              onCloseTrailer(false);
            }}
          >
            <MdOutlineClose className="text-white text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Trailer;
