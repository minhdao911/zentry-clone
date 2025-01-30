import { FunctionComponent, useRef, useEffect } from "react";
import AnimatedTitle from "./ui/AnimatedTitle";
import Button from "./ui/Button";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { cn } from "../utils/cn";
import useTiltEffect from "../hooks/use-tilt-effect";

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  useGSAP(() => {
    gsap.to("body", {
      scrollTrigger: {
        trigger: "#about",
        start: "top center+=200",
        end: "+=50",
        scrub: true,
        onLeaveBack: () => {
          gsap.to("body", {
            backgroundColor: "#edff66",
            duration: 0.01,
          });
        },
      },
      backgroundColor: "#dfdff2",
      duration: 0.01,
    });
  });

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "bottom center+=300",
        end: "+=50",
        scrub: true,
      },
    });

    tl.add([
      gsap.to("body", {
        backgroundColor: "black",
        duration: 0.01,
      }),
      gsap.to(".about-title", {
        color: "#dfdff2",
        duration: 0.01,
        ease: "power1.inOut",
      }),
      gsap.to(".about-text", {
        color: "#dfdff2",
        duration: 0.01,
        ease: "power1.inOut",
      }),
      gsap.to(".about-btn", {
        backgroundColor: "#dfdff2",
        color: "black",
        duration: 0.01,
        ease: "power1.inOut",
      }),
      gsap.to(".about-trigger > div:first-child", {
        backgroundColor: "#dfdff2",
        duration: 0.01,
        ease: "power1.inOut",
      }),
    ]);
  });

  return (
    <section id="about" className="relative h-dvh w-screen">
      <div className="flex-center flex-col gap-6 h-full">
        <AnimatedTitle
          title="We're b<b>u</b>ilding<br />a new <trigger>trigger1</trigger> realit<b>y</b><br />that rew<b>a</b>rds<br />play<b>e</b>rs <trigger>trigger2</trigger> and<br />e<b>m</b>powers<br />hu<b>m</b>ans & AI<br />to <trigger>trigger3</trigger> thri<b>v</b>e"
          subTitle="Who we are"
          triggerMap={{
            trigger1: (
              <InteractiveDot
                className="about-trigger"
                imgSrc="img/about-1.webp"
              />
            ),
            trigger2: (
              <InteractiveDot
                className="about-trigger"
                imgSrc="img/about-2.webp"
              />
            ),
            trigger3: (
              <InteractiveDot
                className="about-trigger"
                imgSrc="img/about-3.webp"
              />
            ),
          }}
          styles={{ container: "about-title" }}
        />
        <p className="about-text max-w-[380px] text-body-3 text-center">
          Zentry envisions a future where players, emerging tech, and a new
          economy unite at the convergence of gaming and AI.
        </p>
        <Button
          text="Discover who we are"
          variant="secondary"
          styles={{ container: "about-btn" }}
        />
      </div>
    </section>
  );
};

export default About;

interface InteractiveDotProps {
  className?: string;
  imgSrc?: string;
}

const InteractiveDot = ({ className, imgSrc }: InteractiveDotProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const { transformStyle, handleMouseMove } = useTiltEffect(cardRef, {
    perspective: 500,
    multiplier: 10,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove and re-add the class to restart the animation
            (entry.target as HTMLElement).classList.remove(
              "animate-pulse-scale"
            );
            // Force a reflow
            void (entry.target as HTMLElement).offsetWidth;
            (entry.target as HTMLElement).classList.add("animate-pulse-scale");
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (dotRef.current) {
      observer.observe(dotRef.current);
    }

    return () => {
      if (dotRef.current) {
        observer.unobserve(dotRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      filter: "brightness(1)",
      opacity: 1,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      clipPath: "polygon(25% 25%, 75% 25%, 75% 75%, 25% 75%)",
      filter: "brightness(0)",
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  return (
    <div className={cn("group relative flex-center p-3 z-50", className)}>
      <div
        ref={dotRef}
        className="w-8 h-8 bg-black rounded scale-100 opacity-100 group-hover:scale-125 group-hover:opacity-50 transition-all duration-700 animate-pulse-scale"
      />
      <div className="absolute-center w-64 h-44 cursor-pointer overflow-hidden rounded-lg z-50">
        <div
          ref={cardRef}
          className="origin-center opacity-0 size-full"
          style={{
            clipPath: "polygon(25% 25%, 75% 25%, 75% 75%, 25% 75%)",
            filter: "brightness(1)",
            transform: transformStyle,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <img
            src={imgSrc}
            alt="About image"
            className="size-full origin-center object-cover object-center scale-110"
          />
        </div>
      </div>
    </div>
  );
};
