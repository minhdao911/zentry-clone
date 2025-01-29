import { FunctionComponent } from "react";
import AnimatedTitle from "./ui/AnimatedTitle";
import Button from "./ui/Button";
import { updates } from "../constants";
import AnimatedImg from "./ui/AnimatedImg";

interface UpdatesProps {}

const Updates: FunctionComponent<UpdatesProps> = () => {
  return (
    <section className="min-h-dvh w-screen px-10 pt-28 pb-56">
      <div className="container grid grid-cols-2 mx-auto gap-28 lg:gap-0">
        <div className="relative col-span-1">
          <div className="sticky top-10 z-10">
            <AnimatedTitle title="Latest<br />updates" align="left" />
            <div className="flex flex-col gap-5 mt-5">
              <p className="font-roobert-regular lg:text-sm w-80 lg:w-72 text-neutral-900">
                Stay updated with the latest news, events, and updates in our
                ecosystem. Be part of our universe's growth and evolution.
              </p>
              <Button text="Read all news" variant="secondary" />
            </div>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="flex flex-col gap-10">
            {updates.map(({ date, title, image }) => (
              <div className="w-full sm:w-[500px] sm:odd:self-end lg:odd:self-auto">
                <AnimatedImg
                  src={image}
                  alt={title}
                  delta={3}
                  className="w-full border border-black rounded-lg"
                />
                <div className="flex gap-10 mt-5 w-full pr-10">
                  <p className="font-general text-xs lg:text-3xs">{date}</p>
                  <h3 className="font-roobert-regular leading-5 text-lg lg:text-base">
                    {title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Updates;
