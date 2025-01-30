import { FunctionComponent, useRef } from "react";
import Logo from "../assets/logo.svg?react";
import { footerLinks } from "../constants";
import Button from "./ui/Button";
import useTiltEffect from "../hooks/use-tilt-effect";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const textRef = useRef<HTMLDivElement>(null);

  const { transformStyle, handleMouseMove, handleMouseLeave } = useTiltEffect(
    textRef,
    { multiplier: 10 }
  );

  return (
    <footer className="bg-zentry-violet-500">
      <h1
        ref={textRef}
        className="text-[35vw] font-zentry special-font text-center tracking-tight leading-none mb-16 w-full overflow-hidden zentry-text cursor-default"
        style={{
          transform: transformStyle,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        Zentr<b>y</b>
      </h1>

      <div className="container mx-auto px-4">
        <div className="w-full grid grid-cols-3 grid-rows-2 md:grid-cols-5 md:grid-rows-1 gap-x-8 gap-y-12">
          <div className="col-span-1 row-span-2 md:row-span-1">
            <a href="/">
              <Logo className="w-14" />
            </a>
          </div>
          {Object.keys(footerLinks).map((key, index) => (
            <div key={index} className="col-span-1 row-span-1">
              <h3 className="font-general text-xs md:text-2xs uppercase mb-4 translate-x-3">
                {key}
              </h3>
              <ul className="font-roobert-regular text-lg">
                {footerLinks[key].map(
                  ({ title, icon, disabled }, linkIndex) => (
                    <li key={linkIndex}>
                      <Button
                        text={title}
                        rightIcon={icon}
                        disabled={disabled}
                        variant="link"
                        styles={{
                          container: "disabled:text-zentry-violet-800",
                          innerContainer: "!gap-0.5",
                          text: "font-roobert-regular text-lg 2xl:text-xl normal-case",
                          icon: "w-4 2xl:w-5",
                        }}
                      />
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-between mt-28 pb-5 text-xs md:text-2xs text-black font-general uppercase">
          <p>©Zentry 2024. All rights reserved</p>
          <p>Made by Minh Dao</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
