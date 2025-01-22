import { FunctionComponent, SVGAttributes } from "react";
import { IconBaseProps, IconType } from "react-icons";

interface IconProps {
  icon: IconType | FunctionComponent<SVGAttributes<SVGElement>>;
  className?: string;
}

const Icon: FunctionComponent<IconProps & IconBaseProps> = ({
  icon: RIcon,
  className,
  ...props
}) => {
  return <RIcon className={className} {...props} />;
};

export default Icon;
