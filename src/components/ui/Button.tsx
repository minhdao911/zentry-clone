import { FunctionComponent, SVGAttributes } from "react";
import { IconType } from "react-icons";
import Icon from "./Icon";
import { cn } from "../../utils/cn";

interface ButtonProps {
  id?: string;
  size?: "sm" | "base";
  text: string;
  leftIcon?: IconType | FunctionComponent<SVGAttributes<SVGElement>>;
  rightIcon?: IconType | FunctionComponent<SVGAttributes<SVGElement>>;
  className?: string;
  iconClassName?: string;
}

const Button: FunctionComponent<ButtonProps> = ({
  id,
  size = "base",
  text,
  leftIcon,
  rightIcon,
  className,
  iconClassName,
}) => {
  const styles = {
    container: {
      base: "px-5 py-2.5 gap-2 2xl:px-6 2xl:py-3 2xl:gap-2.5",
      sm: "px-4 py-2 gap-[5px] 2xl:px-5 2xl:py-2.5 2xl:gap-2",
    },
    text: {
      base: "text-2xs 2xl:text-sm",
      sm: "text-3xs 2xl:text-xs",
    },
    icon: {
      base: "w-3 2xl:w-3.5",
      sm: "w-2 2xl:w-2.5",
    },
  };

  return (
    <button
      id={id}
      className={cn(
        `group relative z-10 w-fit flex-center cursor-pointer overflow-hidden rounded-full bg-violet-50 text-black`,
        styles.container[size],
        className
      )}
    >
      {leftIcon && (
        <Icon
          icon={leftIcon}
          className={cn(styles.icon[size], iconClassName)}
        />
      )}
      <span
        className={cn(
          "relative inline-flex overflow-hidden font-general font-bold uppercase",
          styles.text[size]
        )}
      >
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-2">
          {text}
        </div>
        <div className="absolute translate-y-[160%] skew-y-2 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {text}
        </div>
      </span>
      {rightIcon && (
        <Icon
          icon={rightIcon}
          className={cn(styles.icon[size], iconClassName)}
        />
      )}
    </button>
  );
};

export default Button;
