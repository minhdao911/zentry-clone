import { FunctionComponent, useRef } from "react";
import gsap from "gsap";
import { cn } from "../../utils/cn";

interface AnimatedImgProps {
  src: string;
  alt: string;
  delta?: number;
  size?: number;
  className?: string;
}

const AnimatedImg: FunctionComponent<AnimatedImgProps> = ({
  src,
  alt,
  delta = 10,
  size,
  className,
}) => {
  const frameRef = useRef<HTMLImageElement>(null);

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

    const rotateX = ((y - centerY) / centerY) * -delta;
    const rotateY = ((x - centerX) / centerX) * delta;

    gsap.to(frameRef.current, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  return (
    <img
      ref={frameRef}
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("object-contain", className)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    />
  );
};

export default AnimatedImg;
