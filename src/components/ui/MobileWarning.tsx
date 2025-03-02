import { FunctionComponent, useEffect, useState } from "react";
import Button from "./Button";

interface MobileWarningProps {}

const MobileWarning: FunctionComponent<MobileWarningProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    console.log(window.innerWidth);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Check if user has already dismissed the warning
    const hasSeenWarning = localStorage.getItem("zentry-mobile-warning-seen");

    // Show popup only on mobile devices and if not previously dismissed
    if (window.innerWidth <= 768 && !hasSeenWarning) {
      setIsVisible(true);
    }

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (!isVisible || !isMobile) return null;

  const handleDontShowAgain = () => {
    // Save to localStorage to prevent showing again
    localStorage.setItem("zentry-mobile-warning-seen", "true");
    setIsVisible(false);
  };

  const handleContinue = () => {
    setIsVisible(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4 backdrop-blur-sm">
      <div className="relative max-w-md rounded-lg bg-white p-6 shadow-xl font-roobert-regular">
        <div className="mb-4 flex items-center font-roobert-medium">
          <h2 className="text-xl font-bold text-black">
            Limited Experience Warning
          </h2>
        </div>
        <p className="mb-6 text-sm text-gray-700 leading-relaxed">
          For the best experience of Zentry, we recommend viewing on a larger
          screen. The mobile version offers a reduced experience with limited
          animations and interactions.
        </p>
        <div className="flex justify-between">
          <div onClick={handleDontShowAgain}>
            <Button
              text="Don't show again"
              variant="tertiary"
              styles={{ container: "text-gray-600" }}
            />
          </div>
          <div onClick={handleContinue}>
            <Button
              text="Continue Anyway"
              variant="secondary"
              styles={{ container: "bg-black text-white hover:bg-gray-800" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;
