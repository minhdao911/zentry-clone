import { FunctionComponent, useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import ArrowRight from "../assets/arrow-right.svg?react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {}

const Hero: FunctionComponent<HeroProps> = () => {
  const [prevIndex, setPrevIndex] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

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
      clipPath:
        'path("M 1365 -3 L 1365 -3 Q 1373 -3 1373 5 L 1373 872 Q 1373 880 1365 880 L 5 880 Q -3 880 -3 872 L -3 5 Q -3 -3 5 -3 Z")',
    });
    gsap.to("#video-frame", {
      clipPath:
        'path("M 1126.05 177.709 L 1126.05 177.709 Q 1134.02 178.372 1135.56 186.223 L 1256.93 806.447 Q 1258.47 814.298 1250.47 814.465 L -1.2135 840.508 Q -9.21177 840.675 -7.38321 832.887 L 163.361 105.651 Q 165.19 97.8626 173.162 98.5251 Z")',
      ease: "none",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "200px",
        scrub: true,
      },
      onComplete: () => {
        gsap.set("#video-frame", {
          clipPath:
            'path("M 1126.05 177.709 L 1126.05 177.709 Q 1134.02 178.372 1135.56 186.223 L 1256.93 806.447 Q 1258.47 814.298 1250.47 814.465 L -1.2135 840.508 Q -9.21177 840.675 -7.38321 832.887 L 163.361 105.651 Q 165.19 97.8626 173.162 98.5251 Z")',
        });
        gsap.to("#video-frame", {
          clipPath:
            'path("M 993.162 329.173 L 993.162 329.173 Q 1000.96 330.981 1003.63 338.52 L 1153.93 762.09 Q 1156.6 769.629 1148.64 768.826 L 50.3765 657.973 Q 42.4169 657.17 46.1532 650.096 L 296.767 175.606 Q 300.503 168.532 308.296 170.339 Z")',
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
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-blue-75">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
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

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-75">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 text-body text-blue-75">
              Enter the Metagame <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              text="Watch Trailer"
              leftIcon={ArrowRight}
              className="bg-yellow-300"
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
