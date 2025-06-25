import { FunctionComponent } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Section: FunctionComponent<ContainerProps> = ({ children }) => {
  return (
    <section className="container mx-auto px-5 md:px-10">{children}</section>
  );
};

export default Section;
