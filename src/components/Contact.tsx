import { FunctionComponent } from "react";
import AnimatedTitle, { Title } from "./ui/AnimatedTitle";
import Button from "./ui/Button";

interface ContactProps {}

const Contact: FunctionComponent<ContactProps> = () => {
  return (
    <div className="relative my-10 sm:my-[12rem] md:my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black px-10 md:px-0 py-24 overflow-hidden">
        <div className="absolute top-0 hidden md:block md:left-0 lg:left-20 w-96">
          <ImageClipBox
            className="contact-clip-path-1"
            src="img/contact-1.webp"
          />
        </div>

        <div className="absolute w-[22rem] left-1/2 translate-x-[-50%] -bottom-20 md:left-[15rem] lg:left-[20rem] md:w-96">
          <ImageClipBox
            className="contact-clip-path-2"
            src="img/contact-2.webp"
          />
        </div>

        <div className="invisible flex flex-col items-center text-center gap-10">
          <Title
            title="Let&#39;s b<b>u</b>ild the<br />new era of g<b>a</b>ming<br />t<b>o</b>gether."
            subTitle="Join Zentry"
            styles={{ title: "md:p-0 md:text-[4rem] xl:text-[6rem]" }}
          />
          <Button text="Contact us" />
        </div>
      </div>
      <div className="absolute hidden sm:block -top-[13rem] left-1/2 translate-x-[-50%] md:w-80 md:left-auto md:-right-[9rem] md:top-0">
        <ImageClipBox className="absolute" src="img/swordman-partial.webp" />
        <ImageClipBox
          className="sword-man-clip-path-2 md:sword-man-clip-path"
          src="img/swordman.webp"
        />
      </div>
      <div className="absolute-center w-full flex flex-col items-center text-center gap-10 text-zentry-blue-75">
        <AnimatedTitle
          title="Let&#39;s b<b>u</b>ild the<br />new era of g<b>a</b>ming<br />t<b>o</b>gether."
          subTitle="Join Zentry"
          styles={{
            title: "md:p-0 md:text-[4rem] xl:text-[6rem]",
          }}
        />
        <Button text="Contact us" />
      </div>
    </div>
  );
};

export default Contact;

interface ImageClipBoxProps {
  src: string;
  className?: string;
}

const ImageClipBox: FunctionComponent<ImageClipBoxProps> = ({
  src,
  className,
}) => {
  return (
    <div className={className}>
      <img
        src={src}
        alt="clip"
        className="object-cover object-center w-full h-full"
      />
    </div>
  );
};
