import { useGSAP } from "@gsap/react";
import { FunctionComponent } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import AnimatedTitle from "./ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

interface WelcomeProps {}

const Welcome: FunctionComponent<WelcomeProps> = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });
    clipAnimation.to("#clip-image", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });
  });

  return (
    <section className="min-h-screen w-screen bg-zentry-blue-75 pt-36">
      <div className="relative">
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's largest shared <a>a</a>dventure"
          subTitle="Welcome to Zentry"
          styles={{ container: "px-5 md:px-0" }}
        />

        <div id="clip" className="relative h-dvh w-screen">
          <div className="absolute left-0 top-36 w-full z-20 scale-150">
            <img src="img/stones.webp" alt="Stones" />
          </div>
          <div
            id="clip-image"
            className="absolute left-0 top-px size-full z-10"
            style={{ clipPath: "polygon(33% 9%, 63% 13%, 71% 71%, 31% 77%)" }}
          >
            <img
              src="img/welcome.webp"
              alt="Background"
              className="absolute left-0 top-0 size-full object-cover"
            />
          </div>

          <div className="about-subtext">
            <p>The Metagame begins-your life, now an epic MMORPG</p>
            <p className="text-gray-500">
              Zentry is the unified play layer bridges players, agentic AI, and
              blockchains, creating a new economic paradigm
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
