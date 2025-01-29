import { FunctionComponent } from "react";
import AnimatedTitle from "./ui/AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./ui/RoundedCorners";
import Button from "./ui/Button";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedImg from "./ui/AnimatedImg";

gsap.registerPlugin(ScrollTrigger);

interface StoryProps {}

const Story: FunctionComponent<StoryProps> = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".story-img-content",
      {
        transform:
          "perspective(700px) translate3d(0, 100px, 0) rotateX(-40deg);",
        opacity: 0,
      },
      {
        transform: "perspective(700px) translate3d(0, 0, 0) rotateX(0)",
        opacity: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".story-img-container",
          start: "top bottom",
          end: "+=300",
          scrub: 1,
        },
      }
    );
  });

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#story",
        start: "bottom bottom",
        end: "+=50",
        scrub: 1,
      },
    });

    tl.add([
      gsap.to("body", {
        backgroundColor: "#edff66",
        duration: 0.01,
      }),
      gsap.to(".story-title", {
        color: "black",
        mixBlendMode: "normal",
        duration: 0.01,
      }),
      gsap.to(".story-text", {
        color: "black",
        duration: 0.01,
      }),
      gsap.to(".story-btn", {
        backgroundColor: "black",
        color: "white",
        duration: 0.01,
      }),
      gsap.to(".vault-btn", {
        opacity: 1,
        duration: 1,
      }),
    ]);
  });

  return (
    <section id="story" className="relative h-dvh w-screen pt-20 pb-52">
      <div className="container mx-auto px-3 md:px-20">
        <AnimatedTitle
          title="The st<b>o</b>ry of<br />a hidden real<b>m</b>"
          subTitle="The open IP universe"
          styles={{
            container:
              "story-title text-zentry-blue-75 relative mix-blend-difference z-10",
          }}
        />

        <div className="story-img-container">
          <div className="story-img-mask">
            <div className="story-img-content">
              <AnimatedImg src="img/entrance.webp" alt="Entrance" />
            </div>
          </div>
          <RoundedCorners />
        </div>

        <div className="mt-[-150px] md:mt-[-100px] w-full flex justify-center lg:justify-end">
          <div className="flex h-full w-fit flex-col items-center lg:items-start">
            <p className="story-text mb-5 lg:mb-3 max-w-xs text-center md:text-sm font-roobert-regular text-zentry-blue-75 lg:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>
            <Button
              text="Discover prologue"
              styles={{ container: "story-btn" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
