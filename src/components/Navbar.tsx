import { FunctionComponent, useEffect, useRef, useState } from "react";
import Logo from "../assets/logo.svg?react";
import ArrowDownNarrow from "../assets/arrow-down-narrow.svg?react";
import ArrowUpRight from "../assets/arrow-up-right.svg?react";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "../utils/cn";

interface NavbarProps {}

const navItems = [
  {
    text: "Nexus",
    icon: ArrowUpRight,
  },
  {
    text: "Vault",
    icon: ArrowUpRight,
  },
  {
    text: "Prologue",
  },
  {
    text: "About",
  },
  {
    text: "Contact",
  },
];

const Navbar: FunctionComponent<NavbarProps> = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > 0) {
      if (currentScrollY < lastScrollY) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.add("floating-nav");
      } else {
        setIsNavVisible(false);
      }
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY]);

  useGSAP(
    () => {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
        ease: "power1.inOut",
      });
    },
    { dependencies: [isNavVisible] }
  );

  useEffect(() => {
    if (isAudioPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isAudioPlaying]);

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed top-4 inset-x-0 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Logo className="w-8 text-blue-75 2xl:w-10" />
            <div className="flex items-center gap-3">
              <Button size="sm" text="Products" rightIcon={ArrowDownNarrow} />
              <Button size="sm" text="Whitepaper" />
            </div>
          </div>
          <div className="flex items-center">
            {navItems.map(({ text, icon }, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center gap-[2.5px] nav-hover-btn"
              >
                <span className="text-2xs">{text}</span>
                {icon && <Icon icon={icon} className="w-2 text-blue-75" />}
              </a>
            ))}

            <button
              className="flex items-center space-x-[.165rem] h-4 ml-10"
              onClick={toggleAudio}
            >
              <audio
                ref={audioRef}
                src="audio/loop.mp3"
                loop
                className="hidden"
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={cn(
                    "indicator-line",
                    isIndicatorActive && "active"
                  )}
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

export default Navbar;
