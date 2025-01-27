import gsap from "gsap";
import {
  cloneElement,
  forwardRef,
  FunctionComponent,
  useEffect,
  useRef,
} from "react";
import { cn } from "../../utils/cn";
import { TextPlugin } from "gsap/all";

gsap.registerPlugin(TextPlugin);

interface AnimatedTitleProps {
  title: string;
  subTitle?: string;
  align?: "left" | "center" | "right";
  styles?: {
    container?: string;
    title?: string;
    subtitle?: string;
  };
  triggerMap?: {
    [key: string]: React.ReactElement;
  };
}

const AnimatedTitle: FunctionComponent<AnimatedTitleProps> = (props) => {
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

      if (props.subTitle) {
        titleAnimation.to(".animated-subtitle", {
          duration: 0.8,
          text: {
            value: props.subTitle,
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

  return <Title ref={containerRef} {...props} />;
};

export default AnimatedTitle;

export const Title = forwardRef(
  (
    {
      title,
      subTitle,
      styles,
      align = "center",
      triggerMap,
    }: AnimatedTitleProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col justify-center gap-8", styles?.container)}
      >
        {subTitle && (
          <h2 className={cn("animated-subtitle", styles?.subtitle)} />
        )}
        <div className={cn("animated-title", styles?.title)}>
          {title.split("<br />").map((line, index) => (
            <div
              key={index}
              className={cn("flex max-w-full flex-wrap gap-2 md:gap-3", {
                "justify-start": align === "left",
                "justify-center": align === "center",
                "justify-end": align === "right",
              })}
            >
              {line.split(" ").map((word, i) => {
                const triggerMatch = word.match(/<trigger>(.*?)<\/trigger>/);
                if (triggerMatch) {
                  const triggerComp = triggerMap?.[triggerMatch[1]];
                  return triggerComp
                    ? cloneElement(triggerComp, {
                        key: i,
                        className: cn(
                          "animated-word",
                          triggerComp.props.className
                        ),
                      })
                    : null;
                }
                return (
                  <span
                    key={i}
                    className="animated-word"
                    dangerouslySetInnerHTML={{ __html: word }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
