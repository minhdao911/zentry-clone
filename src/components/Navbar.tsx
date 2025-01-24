import {
  FunctionComponent,
  SVGAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import Logo from "../assets/logo.svg?react";
import ArrowDownNarrow from "../assets/arrow-down-narrow.svg?react";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import { useWindowScroll, useWindowSize } from "react-use";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "../utils/cn";
import { navItems } from "../constants";
import { IconType } from "react-icons";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { y: currentScrollY } = useWindowScroll();
  const { width: windowWidth } = useWindowSize();

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
            <Logo className="w-8 text-zentry-blue-75 2xl:w-10" />
            <div className="flex items-center gap-3">
              <Button size="sm" text="Products" rightIcon={ArrowDownNarrow} />
              <Button size="sm" text="Whitepaper" />
            </div>
          </div>
          <div
            className="flex items-center gap-10 cursor-pointer"
            onMouseLeave={() => {
              gsap.set(".nav-item-bg", {
                clearProps: "all",
              });
            }}
          >
            <div className="nav-item-bg absolute rounded-full bg-zentry-blue-75" />

            {navItems.map((item, index) => (
              <NavItem
                key={index}
                {...item}
                isMobileScreen={windowWidth < 640}
              />
            ))}

            <button
              className="flex items-center space-x-[.165rem] h-4"
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

interface NavItemProps {
  text: string;
  icon?: IconType | FunctionComponent<SVGAttributes<SVGElement>>;
  mobile: boolean;
  isMobileScreen?: boolean;
}

function NavItem({ text, icon, mobile, isMobileScreen }: NavItemProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!bgRef.current) return;

    const navBg = document.querySelector(".nav-item-bg") as HTMLElement;
    if (!navBg) return;

    const { left, top, width, height } = bgRef.current.getBoundingClientRect();
    const currentLeft = parseFloat(navBg.style.left);

    if (isNaN(currentLeft)) {
      // Initial state - set position immediately
      gsap.set(".nav-item-bg", {
        left: left - (isMobileScreen ? 0 : 24),
        top: top - 14,
        width: width,
        height: height,
        opacity: 1,
      });
    } else {
      // Animate to new position
      gsap.to(".nav-item-bg", {
        left: left - 24,
        top: top - 14,
        width: width,
        height: height,
        duration: 0.3,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <li
      className={cn(
        "relative group flex items-center gap-[2.5px] font-general font-semibold text-xs uppercase transition duration-300 text-zentry-blue-50 hover:text-black",
        {
          "hidden md:flex": !mobile,
        }
      )}
      onMouseEnter={handleMouseEnter}
    >
      <a href="#">
        <span className="text-2xs">{text}</span>
      </a>
      {icon && <Icon icon={icon} className="w-2" />}
      <div ref={bgRef} className="absolute -inset-y-1.5 -inset-x-3" />
    </li>
  );
}
