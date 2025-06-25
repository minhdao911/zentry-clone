import { FunctionComponent, useEffect, useState } from "react";
import Button from "./Button";
import useMobile from "../../hooks/use-mobile";

interface MobileWarningProps {}

const MobileWarning: FunctionComponent<MobileWarningProps> = () => {
  const { isTablet } = useMobile();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenWarning = localStorage.getItem("zentry-mobile-warning-seen");

    if (isTablet && !hasSeenWarning) {
      setIsVisible(true);
    }
  }, [isTablet]);

  if (!isVisible || !isTablet) return null;

  const handleDontShowAgain = () => {
    localStorage.setItem("zentry-mobile-warning-seen", "true");
    setIsVisible(false);
  };

  const handleContinue = () => {
    setIsVisible(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 p-4 backdrop-blur-sm">
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
