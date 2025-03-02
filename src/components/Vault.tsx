import { FunctionComponent, useState } from "react";
import AnimatedTitle from "./ui/AnimatedTitle";
import Button from "./ui/Button";
import { vaultItems } from "../constants";
import { cn } from "../utils/cn";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface VaultProps {}

const Vault: FunctionComponent<VaultProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    gsap.set("#vault-item-1 .vault-content", {
      height: "auto",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#vault",
        start: "center center",
        end: "+=1500",
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });

    tl.to(`#vault-item-1 .progress-bar`, {
      height: "100%",
      onComplete: () => {
        collapseAndExpandContent(1, 2);
        setCurrentIndex((prev) => prev + 1);
      },
    });
    tl.to(`#vault-item-2 .progress-bar`, {
      height: "100%",
      onComplete: () => {
        collapseAndExpandContent(2, 3);
        setCurrentIndex((prev) => prev + 1);
      },
      onReverseComplete: () => {
        collapseAndExpandContent(2, 1);
        setCurrentIndex((prev) => prev - 1);
      },
    });
    tl.to(`#vault-item-3 .progress-bar`, {
      height: "100%",
      onReverseComplete: () => {
        collapseAndExpandContent(3, 2);
        setCurrentIndex((prev) => prev - 1);
      },
    });
  });

  const collapseAndExpandContent = (index1: number, index2: number) => {
    gsap.to(`#vault-item-${index1} .vault-content`, {
      height: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
    gsap.to(`#vault-item-${index2} .vault-content`, {
      height: "auto",
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  return (
    <section id="vault" className="relative h-dvh w-screen px-10 py-16">
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-10">
          <AnimatedTitle
            title="The univ<b>e</b>rse<br />powered by Ze<b>n</b>t"
            align="left"
          />
          <Button
            text="Enter vault"
            variant="secondary"
            styles={{ container: "vault-btn opacity-0" }}
          />
        </div>

        <div className="absolute-center md:translate-x-0 md:translate-y-0 md:top-auto md:left-auto md:right-0 md:bottom-0 w-[350px] md:w-[470px]">
          <video
            src="videos/vault-1.webm"
            autoPlay
            loop
            muted
            className={cn("hidden", currentIndex === 0 && "block")}
          />
          <video
            src="videos/vault-2.webm"
            autoPlay
            loop
            muted
            className={cn("hidden", currentIndex === 1 && "block")}
          />
          <video
            src="videos/vault-3.webm"
            autoPlay
            loop
            muted
            className={cn("hidden", currentIndex === 2 && "block")}
          />
        </div>

        <div className="flex flex-col w-full gap-2 md:w-[50%] md:gap-4">
          {vaultItems.map((item, index) => (
            <li
              id={`vault-item-${index + 1}`}
              key={index}
              className={cn(
                "flex flex-col gap-2 list-none text-black transition",
                currentIndex !== index && "text-black/50"
              )}
            >
              <div className="flex items-center gap-10">
                <p className="text-body-2 !font-roboto-mono w-[15px] text-center">
                  0{index + 1}
                </p>
                <h3
                  className={cn(
                    "text-body",
                    currentIndex !== index &&
                      "text-sm md:text-xs !font-roboto-mono uppercase"
                  )}
                >
                  {item.title}
                </h3>
              </div>
              <div className="vault-content flex flex-col h-0 overflow-hidden">
                <div className="flex gap-10">
                  <div className="relative w-[15px] flex justify-center shrink-0">
                    <div className="absolute w-0.5 h-full bg-black/20" />
                    <div className="progress-bar absolute w-0.5 h-[0%] bg-black" />
                  </div>
                  <p className="text-body-2 md:w-[14rem]">{item.description}</p>
                </div>
                <div className="h-4 w-full" />
              </div>
            </li>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vault;
