import { useWindowSize } from "react-use";

const useMobile = () => {
  const { width: windowWidth } = useWindowSize();

  const isMobile = windowWidth <= 640;
  const isTablet = windowWidth <= 768;

  return { isMobile, isTablet, isDesktop: !isMobile && !isTablet };
};

export default useMobile;
