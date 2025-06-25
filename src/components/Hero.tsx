import { FunctionComponent, useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import ArrowRight from "../assets/arrow-right.svg?react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { HiArrowLongDown } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {}

const Hero: FunctionComponent<HeroProps> = () => {
  const [prevIndex, setPrevIndex] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  const totalVideos = 4;
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        if (loadedVideos > 0) {
          setIsLoading(false);
        }
        setHasTimedOut(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isLoading, loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVideoRef.current?.play();
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });
    gsap.to("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      ease: "none",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "200px",
        scrub: true,
      },
      onComplete: () => {
        gsap.set("#video-frame", {
          clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        });
        gsap.to("#video-frame", {
          clipPath: "polygon(14% 0, 72% 0, 88% 90%, 2% 74%)",
          ease: "none",
          scrollTrigger: {
            trigger: "#video-frame",
            start: "200px",
            end: "bottom top",
            scrub: true,
          },
        });
      },
    });
  });

  const handleVideoLoaded = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const handleCurrentVideoLoaded = () => {
    if (currentVideoRef.current) {
      currentVideoRef.current.currentTime = currentVideoTime;
      currentVideoRef.current.play();
    }
  };

  const handleMiniVideoPlayerClick = () => {
    setHasClicked(true);

    setCurrentVideoTime(nextVideoRef.current?.currentTime || 0);
    setPrevIndex(currentIndex);

    setCurrentIndex(upcomingVideoIndex);
  };

  const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden bg-zentry-blue-75">
      {isLoading && (
        <div className="flex-center absolute z-50 h-dvh w-screen overflow-hidden bg-zentry-blue-75">
          {!hasTimedOut ? (
            <div className="three-body">
              <div className="three-body__dot" />
              <div className="three-body__dot" />
              <div className="three-body__dot" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center max-w-72">
              <p className="font-roobert-regular text-black mb-8">
                The videos are taking longer than expected to load. You can
                still explore the rest of the content below.
              </p>
              <p className="font-roobert-regular tracking-wider text-neutral-400 text-xs">
                SCROLL
              </p>
              <HiArrowLongDown className="text-neutral-400/50 text-2xl" />
            </div>
          )}
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden"
      >
        <div>
          <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              onClick={handleMiniVideoPlayerClick}
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoaded}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoaded}
          />

          <video
            ref={currentVideoRef}
            src={getVideoSrc(prevIndex)}
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={() => {
              handleVideoLoaded();
              handleCurrentVideoLoaded();
            }}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-zentry-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-zentry-blue-75">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 text-base md:text-lg text-zentry-blue-75">
              Enter the Metagame <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              text="Watch Trailer"
              leftIcon={ArrowRight}
              variant="tertiary"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
