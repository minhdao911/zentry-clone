import { useState } from "react";

const useTiltEffect = (
  ref: React.RefObject<HTMLDivElement>,
  config?: {
    perspective?: number;
    delta?: number;
  }
) => {
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const isVisible = ref.current.style.opacity
      ? ref.current.style.opacity === "1"
      : true;

    if (!isVisible) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeX - 0.5) * (config?.delta ?? 5);
    const tiltY = (relativeY - 0.5) * -(config?.delta ?? 5);

    const newTransform = `perspective(${
      config?.perspective ?? 700
    }px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;

    setTransformStyle(newTransform);
  };

  return { transformStyle, handleMouseMove, setTransformStyle };
};

export default useTiltEffect;
