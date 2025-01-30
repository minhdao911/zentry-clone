import { FunctionComponent, useRef } from "react";
import { cn } from "../../utils/cn";
import useTiltEffect from "../../hooks/use-tilt-effect";

interface AnimatedImgProps {
  src: string;
  alt: string;
  multiplier?: number;
  size?: number;
  className?: string;
}

const AnimatedImg: FunctionComponent<AnimatedImgProps> = ({
  src,
  alt,
  multiplier = 10,
  size,
  className,
}) => {
  const frameRef = useRef<HTMLImageElement>(null);

  const { transformStyle, handleMouseMove, handleMouseLeave } = useTiltEffect(
    frameRef,
    {
      perspective: 500,
      multiplier,
    }
  );

  return (
    <img
      ref={frameRef}
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("object-contain", className)}
      style={{ transform: transformStyle }}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    />
  );
};

export default AnimatedImg;
