import { FunctionComponent, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import Button from "./Button";
import ArrowUpRight from "../../assets/arrow-up-right.svg?react";

interface BentoCardProps {
  src?: string;
  title?: React.ReactNode;
  subTitle?: string;
  isComingSoon?: boolean;
  isAutoPlay?: boolean;
  styles?: {
    container?: string;
    video?: string;
    text?: string;
  };
  ctaBtn?: React.ReactNode;
}

const BentoCard: FunctionComponent<BentoCardProps> = ({
  src,
  title,
  subTitle,
  isComingSoon,
  isAutoPlay,
  styles,
  ctaBtn,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
      <div
        className={cn(
          "relative z-10 flex flex-col justify-between p-3 size-full text-zentry-blue-75 lg:p-5",
          styles?.text
        )}
      >
        {title && (
          <div>
            <h1 className="bento-title special-font">{title}</h1>
            {subTitle && (
              <p className="mt-3 max-w-52 text-body-2">{subTitle}</p>
            )}
          </div>
        )}
        <div className="flex items-center gap-5">
          {isComingSoon && (
            <Button
              text="Coming soon"
              disabled
              size="sm"
              leftIcon={ArrowUpRight}
            />
          )}
          {ctaBtn}
        </div>
      </div>
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
  const [transformStyle, setTransformStyle] = useState("");

  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeX - 0.5) * 5;
    const tiltY = (relativeY - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;

    setTransformStyle(newTransform);
  };

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
