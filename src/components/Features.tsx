import { FunctionComponent } from "react";
import BentoCard, { BentoTilt } from "./ui/BentoCard";
import Icon from "./ui/Icon";
import Logo from "../assets/logo.svg?react";
import Button from "./ui/Button";
import ArrowUpRight from "../assets/arrow-up-right.svg?react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface FeaturesProps {}

const Features: FunctionComponent<FeaturesProps> = () => {
  useGSAP(() => {
    const cards = gsap.utils.toArray(".bento-tilt") as HTMLElement[];
    cards.forEach((card: HTMLElement) => {
      gsap.fromTo(
        card,
        {
          transform:
            "perspective(700px) translate3d(0px, 100px, 0) rotateX(-40deg)",
          opacity: 0,
        },
        {
          transform:
            "perspective(700px) translate3d(0px, 0px, 0) rotateX(0deg)",
          opacity: 1,
          ease: "power2.in",
          stagger: 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            end: "+=50",
            scrub: 1,
          },
        }
      );
    });
  });

  useGSAP(() => {
    gsap.to("body", {
      scrollTrigger: {
        trigger: "#features",
      },
      backgroundColor: "black",
    });
  });

  return (
    <section id="features" className="relative bg-black pb-52">
      <div className="container mx-auto px-3 md:px-20">
        <div className="px-5 py-32 text-body">
          <p className="text-zentry-blue-50">Explore the Zentry Universe</p>
          <p className="text-neutral-500 max-w-[400px] 2xl:max-w-[450px]">
            Immerse yourself in an IP-rich product universe where AI-driven
            gamification and hyper-personalization lead humans & AI into a
            global play economy.
          </p>
        </div>

        <BentoTilt className="bento-1 relative mb-7 h-96 w-full md:h-[30rem]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                Radia<b>n</b>t
              </>
            }
            subTitle="The game of games transforming your in-game actions across Web2 & Web3 titles into a rewarding adventure."
            isComingSoon
          />
        </BentoTilt>
        <div className="grid h-[65rem] grid-cols-4 grid-rows-5 gap-7 lg:grid-rows-3">
          <BentoTilt className="bento-tilt_1 row-span-2 col-span-4 lg:col-span-2 lg:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  Zig<b>m</b>a
                </>
              }
              subTitle="The NFT collection merging Zentry’s IP, AI, and gaming—pushing the boundaries of NFT innovation."
              isComingSoon
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_2 lg:col-span-2">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  N<b>e</b>xus
                </>
              }
              subTitle="The player portal uniting humans & AI to play, compete, earn and showcase—gamifying social & Web3 experiences."
              isComingSoon
              styles={{ video: "w-auto left-auto right-5 scale-150" }}
              ctaBtn={
                <Button
                  text="Launch site"
                  rightIcon={ArrowUpRight}
                  size="sm"
                  styles={{
                    container:
                      "bg-black border border-zentry-yellow-300 text-zentry-yellow-300",
                  }}
                />
              }
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 row-span-1 lg:col-span-2">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  Az<b>u</b>l
                </>
              }
              subTitle="The agent of agents elevating agentic AI experience to be more fun and productive."
              isComingSoon
              styles={{ video: "w-auto left-auto right-0" }}
            />
          </BentoTilt>
          <BentoTilt className="relative bento-tilt_2 lg:col-span-2">
            <BentoCard
              title={
                <>
                  M<b>o</b>re <br /> co<b>m</b>ing <br /> s<b>o</b>on.
                </>
              }
              styles={{
                container: "bg-zentry-violet-500 border-none",
                text: "text-black",
              }}
            />
            <Icon
              icon={Logo}
              className="absolute bottom-3 right-3 w-8 md:bottom-5 md:right-5 md:w-10"
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_2 hidden lg:block lg:col-span-2">
            <BentoCard src="videos/feature-5.mp4" isAutoPlay />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
