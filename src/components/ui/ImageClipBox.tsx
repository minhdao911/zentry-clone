import gsap from "gsap";
import { FunctionComponent, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ImageClipBoxProps {
  src: string;
  startY: number;
  className?: string;
}

const ImageClipBox: FunctionComponent<ImageClipBoxProps> = ({
  src,
  className,
  startY,
}) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      {
        y: startY,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <div ref={imageRef} className={className}>
      <img
        src={src}
        alt="clip"
        className="object-cover object-center w-full h-full"
      />
    </div>
  );
};

export default ImageClipBox;
