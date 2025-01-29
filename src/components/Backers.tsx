import { FunctionComponent, useState } from "react";
import { backers, partnersDescription } from "../constants";
import { cn } from "../utils/cn";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface BackersProps {}

const Backers: FunctionComponent<BackersProps> = () => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const [activeDescription, setActiveDescription] = useState<{
    boldText: string;
    text: string;
  }>(partnersDescription[0]);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#backers",
      start: "top center",
      end: "+=850",
      onUpdate: (self) => {
        // Calculate which item should be active based on scroll progress
        const progress = self.progress;
        const totalItems = backers.length;
        const itemProgress = progress * (totalItems - 0.5); // Subtract 0.5 to ensure last item gets highlighted
        const activeIndex = Math.min(Math.floor(itemProgress), totalItems - 1);

        setActiveItem(activeIndex);
        setActiveDescription(backers[activeIndex].description);
      },
    });
  });

  useGSAP(() => {
    gsap.fromTo(
      "body",
      {
        backgroundColor: "black",
      },
      {
        scrollTrigger: {
          trigger: "#backers",
          start: "bottom center+=200",
          end: "+=50",
          scrub: true,
          onLeaveBack: () => {
            gsap.to("body", {
              backgroundColor: "black",
              duration: 0.01,
            });
          },
        },
        backgroundColor: "#dfdff2",
        duration: 0.01,
        onComplete: () => {
          gsap.to(".backers-item > p:last-child", {
            color: "black",
            duration: 0.01,
          });
          gsap.to(".backers-item > p:first-child", {
            color: "#737373",
            duration: 0.01,
          });
          gsap.to(".backers-item > img", {
            opacity: 0,
            duration: 0.01,
          });
          gsap.to(".backers-description", {
            display: "hidden",
            duration: 0.01,
          });
        },
        onReverseComplete: () => {
          gsap.to(".backers-item > p:first-child", {
            clearProps: true,
            duration: 0.01,
          });
          gsap.to(".backers-item > p:last-child", {
            clearProps: true,
            duration: 0.01,
          });
          gsap.to(".backers-item > img", {
            clearProps: true,
            duration: 0.01,
          });
          gsap.to(".backers-description", {
            clearProps: true,
            duration: 0.01,
          });
        },
      }
    );
  });

  return (
    <section id="backers" className="relative min-h-dvh w-screen px-10 py-56">
      <div className="container grid grid-cols-2 mx-auto">
        <div className="relative col-span-2 lg:col-span-1 max-h-[93%]">
          <div className="backers-description">
            <div className="sticky hidden top-[50lvh] z-10 lg:block">
              <div className="absolute left-1/3 -translate-x-1/3">
                <Description
                  boldText={activeDescription.boldText}
                  text={activeDescription.text}
                />
              </div>
            </div>
            <div className="block lg:hidden pl-20 pb-20 max-w-[500px]">
              <Description
                className="text-xl leading-6"
                boldText="Our partners"
                text="span gaming, Web3, Al, and beyond-backing our growth, sparking innovation, and elevating the player experience."
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="relative w-full flex flex-col">
            <p className="absolute hidden -top-12 left-0 font-zentry text-zentry-blue-75 text-5xl lg:block">
              Our partners
            </p>
            {backers.map(({ name, image, type }, index) => (
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "backers-item relative flex items-start text-zentry-blue-75",
                    activeItem === index && "text-zentry-yellow-300"
                  )}
                >
                  <p
                    className={cn(
                      "absolute top-0 left-0 lg:-left-14 font-general text-xs lg:text-3xs uppercase text-neutral-500",
                      activeItem === index && "text-zentry-yellow-300"
                    )}
                  >
                    {type}
                  </p>
                  <p className="font-zentry text-6xl lg:text-5xl pl-20 lg:pl-0">
                    {name}
                  </p>
                </div>
                <img
                  src={image}
                  alt={name}
                  width={100}
                  height={100}
                  className={cn(
                    "hidden lg:block opacity-0",
                    activeItem === index && "opacity-100"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Backers;

const Description = ({
  boldText,
  text,
  className,
}: {
  boldText: string;
  text: string;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "font-roobert-regular text-neutral-500 leading-4",
        className
      )}
    >
      <b className="text-zentry-blue-75">{boldText}</b> {text}
    </h2>
  );
};
