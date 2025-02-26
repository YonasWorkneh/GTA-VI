import { useRef } from "react";

const Button = ({
  id,
  title,
  rightIcon,
  leftIcon,
  containerClass,
  fontFamily,
  fontSize,
  fontWeight,
  onClickHandler,
}) => {
  const hoverAudioRef = useRef(new Audio("/audio/button-hover.mov"));
  const clickAudioRef = useRef(new Audio("/audio/button-click.mov"));

  function handleMouseEnter() {
    if (hoverAudioRef.current) {
      hoverAudioRef.current.currentTime = 0; // Restart audio from beginning
      hoverAudioRef.current
        .play()
        .catch((err) => console.error("Audio play error:", err));
    }
  }

  function handleMouseLeave() {
    if (hoverAudioRef.current) {
      hoverAudioRef.current.pause();
      hoverAudioRef.current.currentTime = 0; // Reset audio
    }
  }

  return (
    <button
      onClick={() => {
        clickAudioRef.current.play();
        console.log("clicked");
        onClickHandler();
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id={id}
      className={`btn-tilt group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 ${containerClass || ""} px-10 py-4 text-black`}
    >
      {leftIcon}
      <span
        className={`relative inline-flex overflow-hidden font-robotoMono ${fontFamily || ""} ${fontSize || ""} ${fontWeight || ""} uppercase`}
      >
        {title}
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
