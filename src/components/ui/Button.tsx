import { FunctionComponent, SVGAttributes } from "react";
import { IconType } from "react-icons";
import Icon from "./Icon";
import clsx from "clsx";

interface ButtonProps {
  id: string;
  text: string;
  leftIcon?: IconType | FunctionComponent<SVGAttributes<SVGElement>>;
  rightIcon?: IconType | FunctionComponent<SVGAttributes<SVGElement>>;
  className?: string;
  iconClassName?: string;
}

const Button: FunctionComponent<ButtonProps> = ({
  id,
  text,
  leftIcon,
  rightIcon,
  className,
  iconClassName,
}) => {
  return (
    <button
      id={id}
      className={clsx(
        `group relative z-10 w-fit flex-center gap-2 cursor-pointer overflow-hidden rounded-full bg-violet-50 px-5 py-2 text-black`,
        className
      )}
    >
      {leftIcon && (
        <Icon icon={leftIcon} className={clsx("w-3", iconClassName)} />
      )}
      <span className="relative inline-flex overflow-hidden font-general text-xs text-[.65rem] font-bold uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-2">
          {text}
        </div>
        <div className="absolute translate-y-[160%] skew-y-2 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {text}
        </div>
      </span>
      {rightIcon && (
        <Icon icon={rightIcon} className={clsx("w-3", iconClassName)} />
      )}
    </button>
  );
};

export default Button;
