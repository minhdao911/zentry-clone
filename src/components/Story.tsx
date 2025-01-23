import { FunctionComponent, useRef } from "react";
import AnimatedTitle from "./ui/AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./ui/RoundedCorners";
import Button from "./ui/Button";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface StoryProps {}

const Story: FunctionComponent<StoryProps> = () => {
  const frameRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".story-img-content",
      {
        transform: "translate(0, 100px) rotateX(-40deg);",
        opacity: 0,
      },
      {
        transform: "translate(0, 0) rotateX(0)",
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

  const handleMouseLeave = () => {
    if (!frameRef.current) return;

    gsap.to(frameRef.current, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;

    const { clientX, clientY } = e;

    const { left, top, width, height } =
      frameRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(frameRef.current, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  return (
    <section className="relative -top-1 h-[90dvh] w-screen bg-black pb-52">
      <div className="container mx-auto px-3 md:px-20">
        <AnimatedTitle
          title="The st<b>o</b>ry of<br />a hidden real<b>m</b>"
          subTitle="The open IP universe"
          styles={{
            container: "text-blue-75 relative mix-blend-difference z-10",
          }}
        />

        <div className="story-img-container">
          <div className="story-img-mask">
            <div className="story-img-content">
              <img
                ref={frameRef}
                src="img/entrance.webp"
                alt="Entrance"
                className="object-contain"
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              />
            </div>
          </div>
          <RoundedCorners />
        </div>

        <div className="mt-[-150px] md:mt-[-100px] w-full flex justify-center lg:justify-end">
          <div className="flex h-full w-fit flex-col items-center lg:items-start">
            <p className="mb-5 lg:mb-3 max-w-xs text-center md:text-sm font-roobert-regular text-blue-75 lg:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>
            <Button text="Discover prologue" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
