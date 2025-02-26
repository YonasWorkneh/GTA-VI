import {
  FaDiscord,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTwitch,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  { href: "https://x.com/rockstargames", icon: <FaXTwitter /> },
  { href: "https://instagram.com/rockstargames", icon: <FaInstagram /> },
  { href: "https://youtube.com/rockstargames", icon: <FaYoutube /> },
  { href: "https://facebook.com/rockstargames", icon: <FaFacebook /> },
  { href: "https://discord.gg/rockstargames", icon: <FaDiscord /> },
  { href: "https://twitch.com/rockstargames", icon: <FaTwitch /> },
];
const navItems = ["Games", "Videos", "Prologue", "About", "Contact"];

const Footer = () => {
  return (
    <footer className="w-screen bg-black p-20 text-white h-full overflow-hidden">
      <h1 className=" font-zentry tilt text-[200px] tracking-widest ml-[40rem] -mt-10 flex gap-2 items-center bg-[linear-gradient(#000000b9,#000000ba),url(/img/rockstar.png)] bg-repeat bg-contain">
        <span>GTA</span>
        <img src="/img/vi.png" alt="six" className="size-[180px]" />
      </h1>
      <div className="container mx-auto mt-10 flex flex-col items-center justify-between md:flex-row ">
        <div className="flex gap-4">
          <img src="/img/rating.svg" alt="rated" className="size-[100px]" />
          <div>
            <p className="border-b-2 border-b-white/10 py-2 text-[10px]">
              May contain content <br /> inappropriate for children.
            </p>
            <p className="py-2 text-[10px]">
              Visit esrb.org for rating information.
            </p>
          </div>
        </div>
        <div className="flex gap-14">
          <img src="/img/ps5.svg" alt="ps5" />
          <img src="/img/xbox.svg" alt="xboxseries" />
        </div>
        <div>
          <img
            src="/img/rockstar.svg"
            alt="rockstar-logo"
            className="size-[100px]"
          />
        </div>
      </div>
      <div className="container flex justify-between items-center mx-auto my-36 ">
        <div className="hidden md:block -ml-6">
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
        <div className="flex gap-10 items-center">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-white text-3xl hover:text-[#ffa500] transition-colors"
              target="_blank"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="text-center text-sm tracking-wide text-white/20">
        <p>
          &copy; 2022 Rockstar Games. All Rights Reserved. Rockstar Games, Grand
          Theft Auto six.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
