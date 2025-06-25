import { FunctionComponent } from "react";
import AnimatedTitle from "./ui/AnimatedTitle";
import BentoCard from "./ui/BentoCard";
import ZentryBento30 from "../assets/zentry-bento-30.svg?react";
import ZentryBento500k from "../assets/zentry-bento-500k.svg?react";
import ZentryBento40m from "../assets/zentry-bento-40m.svg?react";
import { cn } from "../utils/cn";
import { backers, treasuryItems } from "../constants";
import useMobile from "../hooks/use-mobile";

interface OverviewProps {}

const Overview: FunctionComponent<OverviewProps> = () => {
  const { isTablet } = useMobile();

  return (
    <section className="relative min-h-dvh w-screen px-10 py-16">
      <AnimatedTitle
        title="Ze<b>n</b>try at a<br />glan<b>c</b>e"
        subTitle="Our universe in a nutshell"
        align="left"
        styles={{ container: "text-zentry-blue-75 mb-20" }}
      />
      <div className="container flex flex-col lg:flex-row gap-6 mx-auto">
        <div className="flex flex-col items-end gap-6 flex-1 pt-28">
          <BentoCard
            src="videos/overview-1.webm"
            isAutoPlay
            styles={{ container: "w-full max-w-[450px] h-[260px]" }}
          >
            <div className="size-full flex flex-col p-4 text-zentry-blue-75">
              <OverviewTitle text="Products" />
              <p className="font-zentry special-font text-[6rem] leading-none">
                4<b>+</b>
              </p>
            </div>
          </BentoCard>
          <BentoCard
            styles={{
              container:
                "w-1/2 max-w-[282px] h-[282px] bg-zentry-yellow-300 border-none",
            }}
          >
            <div className="relative size-full p-4 text-black">
              <div
                className="transform-gpu"
                style={{
                  transform: isTablet
                    ? "matrix3d(1, -0.236749, 0, 0.0028899, 0, 0.821054, 0, 0, 0, 0, 1, 0, 20, -14.6596, 0, 1)"
                    : "matrix3d(1, -0.236749, 0, 0.0028899, 0, 0.821054, 0, 0, 0, 0, 1, 0, 46.968, -14.6596, 0, 1)",
                }}
              >
                <ZentryBento30 className="aspect-[1/.64] w-full" />
              </div>
              <OverviewTitle
                text="Partners"
                className="absolute bottom-3 right-3"
              />
            </div>
          </BentoCard>
          <BentoCard
            src="videos/overview-2.webm"
            isAutoPlay
            styles={{
              container:
                "w-full max-w-[450px] h-[605px] bg-zentry-violet-500 border-none self-center lg:self-end",
            }}
          >
            <div className="size-full flex flex-col justify-between p-4">
              <div>
                <OverviewTitle text="Treasury" />
                <p className="font-zentry special-font font-bold text-[6rem] leading-none">
                  140<b>M+</b>
                </p>
              </div>
              <div className="w-full flex justify-between gap-2">
                {treasuryItems.map((item, key) => (
                  <div key={key} className="flex items-start gap-2.5">
                    <div className={cn("size-3 rounded-full", item.color)} />
                    <div className="text-zentry-blue-75 font-general text-2xs uppercase">
                      <p className="leading-none">{item.text}</p>
                      <p>{item.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
        <div className="flex flex-col gap-6 flex-1">
          <BentoCard
            styles={{
              container:
                "w-full max-w-[450px] h-[600px] bg-zentry-violet-500 border-none",
            }}
          >
            <div className="size-full p-4">
              <OverviewTitle text="Residents" className="mb-4" />
              <div
                className="transform-gpu"
                style={{
                  transform: isTablet
                    ? "matrix3d(1, -0.18718, 0, 0.0023949, 0, 0.750001, 0, 0, 0, 0, 1, 0, 60, -19.539, 0, 1)"
                    : "matrix3d(1, -0.18718, 0, 0.0023949, 0, 0.750001, 0, 0, 0, 0, 1, 0, 104.387, -19.539, 0, 1)",
                }}
              >
                <ZentryBento500k className="aspect-[1/.32] w-full" />
              </div>
              <div className="absolute bottom-0 left-0">
                <img
                  src="img/gallery-1.webp"
                  alt="Character"
                  className="w-full"
                />
              </div>
            </div>
          </BentoCard>
          <BentoCard
            styles={{
              container: "w-1/2 max-w-[282px] h-[282px] self-end lg:self-start",
            }}
          >
            <div className="size-full flex flex-col justify-between p-4 text-zentry-blue-75">
              <p className="font-zentry special-font text-[2rem] md:text-[3rem] leading-none">
                W<b>orld</b>-class
                <br />b<b>a</b>ckers
              </p>
              <div className="flex flex-col items-end">
                {backers
                  .filter((b) => b.type === "backer")
                  .map((backer, index) => (
                    <p key={index} className="font-general text-3xs uppercase">
                      {backer.name}
                    </p>
                  ))}
              </div>
            </div>
          </BentoCard>
          <BentoCard
            styles={{
              container:
                "w-full max-w-[450px] h-[256px] bg-zentry-blue-75 border-none",
            }}
          >
            <div className="relative size-full p-4">
              <OverviewTitle text="Revenue generated" className="leading-3" />
              <OverviewTitle text="2024" />
              <div
                className="absolute bottom-3 left-0 right-5 transform-gpu"
                style={{
                  transform: isTablet
                    ? "matrix3d(0.926398, -0.196153, 0, -0.0019292, -0.151131, 0.664834, 0, -0.0007239, 0, 0, 1, 0, -40, 10, 0, 1)"
                    : "matrix3d(0.926398, -0.196153, 0, -0.0019292, -0.151131, 0.664834, 0, -0.0007239, 0, 0, 1, 0, -68.7245, 10, 0, 1)",
                }}
              >
                <ZentryBento40m className="w-full" />
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default Overview;

const OverviewTitle = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => <p className={cn("font-roobert-regular text-xs", className)}>{text}</p>;
