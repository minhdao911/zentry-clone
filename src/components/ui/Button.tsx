import { FunctionComponent, SVGAttributes } from "react";
import { IconType } from "react-icons";
import Icon from "./Icon";
import { cn } from "../../utils/cn";

type ButtonSize = "sm" | "base";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "link";

type ButtonStyles = {
  container?: string;
  innerContainer?: string;
  icon?: string;
  text?: string;
};

interface ButtonProps {
  id?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  text: string;
  disabled?: boolean;
  leftIcon?: IconType | FunctionComponent<SVGAttributes<SVGElement>>;
  rightIcon?: IconType | FunctionComponent<SVGAttributes<SVGElement>>;
  styles?: ButtonStyles;
}

const Button: FunctionComponent<ButtonProps> = ({
  id,
  size = "base",
  variant = "primary",
  text,
  disabled,
  leftIcon,
  rightIcon,
  styles,
}) => {
  const containerStyles = {
    base: "px-5 py-2.5 2xl:px-6 2xl:py-3",
    sm: "px-2.5 sm:px-4 py-1.5 sm:py-2 2xl:px-5 2xl:py-2.5",
  };

  const variantStyles = {
    primary: {
      container: "bg-violet-50 text-black",
    },
    secondary: {
      container: "bg-black text-white",
    },
    tertiary: {
      container: "bg-zentry-yellow-300 text-black",
    },
    link: {
      container:
        "bg-transparent py-0.5 px-3 text-black enabled:hover:bg-black enabled:hover:text-white disabled:border-none",
    },
  };

  const getButtonContent = () => {
    if (disabled) {
      return (
        <ButtonContent
          text={text}
          size={size}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          styles={styles}
        />
      );
    }

    if (variant === "link") {
      return (
        <ButtonContent
          text={text}
          size={size}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          styles={styles}
        />
      );
    }

    return (
      <>
        <div className="translate-y-0 skew-y-0 transition duration-300 group-hover:translate-y-[-200%] group-hover:skew-y-6">
          <ButtonContent
            text={text}
            size={size}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            styles={styles}
          />
        </div>
        <div className="absolute translate-y-[200%] skew-y-6 transition duration-300 group-hover:translate-y-0 group-hover:skew-y-0">
          <ButtonContent
            text={text}
            size={size}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            styles={styles}
          />
        </div>
      </>
    );
  };

  return (
    <button
      id={id}
      disabled={disabled}
      className={cn(
        "group relative z-10 w-fit flex-center cursor-pointer overflow-hidden rounded-full bg-violet-50 transition scale-100",
        "disabled:bg-transparent disabled:border disabled:border-neutral-600 disabled:text-neutral-600 disabled:cursor-default",
        "enabled:hover:scale-110 enabled:hover:rounded-lg",
        containerStyles[size],
        variantStyles[variant].container,
        styles?.container
      )}
    >
      {getButtonContent()}
    </button>
  );
};

export default Button;

interface ButtonContentProps {
  text: string;
  size: ButtonSize;
  leftIcon?: IconType | FunctionComponent<SVGAttributes<SVGElement>>;
  rightIcon?: IconType | FunctionComponent<SVGAttributes<SVGElement>>;
  styles?: ButtonStyles;
}

const ButtonContent: FunctionComponent<ButtonContentProps> = ({
  text,
  size,
  leftIcon,
  rightIcon,
  styles,
}) => {
  const defaultStyles = {
    innerContainer: {
      base: "gap-2 2xl:gap-2.5",
      sm: "gap-1 sm:gap-[6px] 2xl:gap-2",
    },
    text: {
      base: "text-2xs 2xl:text-sm",
      sm: "text-3xs 2xl:text-xs",
    },
    icon: {
      base: "w-3 2xl:w-3.5",
      sm: "w-1.5 sm:w-2 2xl:w-2.5",
    },
  };

  return (
    <div
      className={cn(
        "w-full flex-center",
        defaultStyles.innerContainer[size],
        styles?.innerContainer
      )}
    >
      {leftIcon && (
        <Icon
          icon={leftIcon}
          className={cn(defaultStyles.icon[size], styles?.icon)}
        />
      )}
      <span
        className={cn(
          "overflow-hidden font-general font-bold uppercase",
          defaultStyles.text[size],
          styles?.text
        )}
      >
        {text}
      </span>
      {rightIcon && (
        <Icon
          icon={rightIcon}
          className={cn(defaultStyles.icon[size], styles?.icon)}
        />
      )}
    </div>
  );
};
