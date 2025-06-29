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
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "../utils/cn";
import { navItems } from "../constants";
import { IconType } from "react-icons";
import useMobile from "../hooks/use-mobile";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

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
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setIsAudioPlaying((prev) => !prev);
  };

  const handleMouseLeaveRightNavbar = () => {
    const navBg = document.querySelector(".nav-item-bg") as HTMLElement;

    if (!navBg) return;

    gsap.to(navBg, {
      clearProps: "all",
      duration: 0.1,
      ease: "power1.inOut",
      onComplete: () => {
        setTimeout(() => {
          const currentLeft = parseFloat(navBg.style.left);
          if (!isNaN(currentLeft)) {
            gsap.set(navBg, {
              clearProps: "all",
            });
          }
        }, 200);
      },
    });
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed top-4 w-[calc(100vw-1rem)] md:w-[calc(100vw-3rem)] lg:w-auto left-2 lg:left-6 inset-x-0 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between px-3 lg:px-6">
          <div className="flex items-center gap-2 lg:gap-7">
            <Logo className="w-7 lg:w-8 text-zentry-blue-75" />
            <div className="flex items-center gap-3">
              <Button size="sm" text="Products" rightIcon={ArrowDownNarrow} />
              <Button size="sm" text="Whitepaper" />
            </div>
          </div>
          <div className="flex items-center gap-5 lg:gap-10 cursor-pointer">
            <div
              className="flex items-center gap-5 lg:gap-10"
              onMouseLeave={handleMouseLeaveRightNavbar}
            >
              <div className="nav-item-bg absolute rounded-full bg-zentry-blue-75" />

              {navItems.map((item, index) => (
                <NavItem key={index} {...item} />
              ))}
            </div>

            <button
              className={cn(
                "relative flex items-center space-x-[.165rem] h-4 mr-3 lg:mr-0",
                !hasInteracted &&
                  "before:absolute before:inset-0 before:animate-ping before:rounded-md before:bg-zentry-blue-75/30 before:-m-0.5"
              )}
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
                  className={cn("indicator-line", isAudioPlaying && "active")}
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
}

function NavItem({ text, icon, mobile }: NavItemProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMobile();

  const handleMouseEnter = () => {
    if (!bgRef.current) return;

    const navBg = document.querySelector(".nav-item-bg") as HTMLElement;
    if (!navBg) return;

    const { left, top, width, height } = bgRef.current.getBoundingClientRect();
    const currentLeft = parseFloat(navBg.style.left);

    if (isNaN(currentLeft)) {
      // Initial state - set position immediately
      gsap.set(".nav-item-bg", {
        left: left - (isMobile ? 0 : 24),
        top: top - 30,
        width: width,
        height: height,
      });
    } else {
      // Animate to new position
      gsap.to(".nav-item-bg", {
        left: left - 24,
        top: top - 30,
        width: width,
        height: height,
        duration: 0.3,
        ease: "power1.inOut",
      });
    }
  };

  if (isMobile && !mobile) {
    return null;
  }

  return (
    <li
      className={cn(
        "relative group flex items-center gap-[2.5px] font-general font-semibold text-xs uppercase text-zentry-blue-50 mix-blend-difference 2xl:gap-1.5"
      )}
      onMouseEnter={handleMouseEnter}
    >
      <a href="#">
        <span className="text-2xs 2xl:text-sm">{text}</span>
      </a>
      {icon && <Icon icon={icon} className="w-2 2xl:w-3" />}
      <div ref={bgRef} className="absolute -inset-y-1.5 -inset-x-3" />
    </li>
  );
}
