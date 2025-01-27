import { FunctionComponent, useRef } from "react";
import { cn } from "../../utils/cn";
import useTiltEffect from "../../hooks/use-tilt-effect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface BentoCardProps {
  src?: string;
  isAutoPlay?: boolean;
  styles?: {
    container?: string;
    video?: string;
  };
  children?: React.ReactNode;
}

const BentoCard: FunctionComponent<BentoCardProps> = ({
  src,
  isAutoPlay,
  styles,
  children,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      {
        transform:
          "perspective(700px) translate3d(0px, 100px, 0) rotateX(-40deg)",
        opacity: 0,
      },
      {
        transform: "perspective(700px) translate3d(0px, 0px, 0) rotateX(0deg)",
        opacity: 1,
        ease: "power2.in",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          scrub: 0.5,
        },
      }
    );
  });

  const handleMouseEnter = () => {
    if (!videoRef.current) return;
    if (!isAutoPlay) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    if (!isAutoPlay) videoRef.current.pause();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative size-full border-hsla overflow-hidden rounded-md",
        styles?.container
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {src && (
        <video
          ref={videoRef}
          src={src}
          autoPlay={isAutoPlay}
          loop
          muted
          className={cn(
            "absolute left-0 top-0 size-full object-cover object-center",
            styles?.video
          )}
        />
      )}
      {children}
    </div>
  );
};

export default BentoCard;

interface BentoTiltProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoTilt: FunctionComponent<BentoTiltProps> = ({
  children,
  className,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const { transformStyle, handleMouseMove, setTransformStyle } =
    useTiltEffect(itemRef);

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div className={cn("bento-tilt", className)}>
      <div
        ref={itemRef}
        className={"size-full"}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: transformStyle }}
      >
        {children}
      </div>
    </div>
  );
};
