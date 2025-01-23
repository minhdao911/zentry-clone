import gsap from "gsap";
import { FunctionComponent, useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import { TextPlugin } from "gsap/all";

gsap.registerPlugin(TextPlugin);

interface AnimatedTitleProps {
  title: string;
  subTitle?: string;
  className?: string;
}

const AnimatedTitle: FunctionComponent<AnimatedTitleProps> = ({
  title,
  subTitle,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      if (subTitle) {
        titleAnimation.to(".animated-subtitle", {
          duration: 0.8,
          text: {
            value: subTitle,
            delimiter: " ",
          },
        });
      }

      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {subTitle && <h2 className="animated-subtitle" />}
      <div className={cn("animated-title", className)}>
        {title.split("<br />").map((line, index) => (
          <div
            key={index}
            className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
          >
            {line.split(" ").map((word, i) => (
              <span
                key={i}
                className="animated-word"
                dangerouslySetInnerHTML={{ __html: word }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTitle;
