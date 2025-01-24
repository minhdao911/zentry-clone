import { FunctionComponent, useState } from "react";
import Logo from "../assets/logo.svg?react";
import { footerLinks } from "../constants";
import Button from "./ui/Button";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { offsetWidth, offsetHeight } = currentTarget as HTMLElement;
    const x = (clientX / offsetWidth) * 30 - 15; // Adjust the multiplier for more/less tilt
    const y = (clientY / offsetHeight) * 30 - 15;
    setTransform({ x, y });
  };

  return (
    <footer className="bg-zentry-violet-500">
      <h1
        className="text-[35vw] font-zentry special-font text-center tracking-tight leading-none mb-16 w-full overflow-hidden zentry-text"
        style={{
          transform: `rotateY(${transform.x}deg) rotateX(${transform.y}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTransform({ x: 0, y: 0 })}
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
              <h3 className="font-general text-xs md:text-2xs uppercase mb-5">
                {key}
              </h3>
              <ul className="space-y-1 font-roobert-regular text-lg">
                {footerLinks[key].map(
                  ({ title, icon, disabled }, linkIndex) => (
                    <li key={linkIndex}>
                      <Button
                        text={title}
                        rightIcon={icon}
                        disabled={disabled}
                        styles={{
                          container:
                            "bg-transparent p-0 rounded-none gap-0.5 disabled:text-zentry-violet-800 disabled:border-none",
                          text: "font-roobert-regular text-lg normal-case",
                          icon: "w-4 h-4",
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
