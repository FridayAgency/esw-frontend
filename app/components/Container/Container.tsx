import { ClassName } from "@fridayagency/classnames";
import React, { createElement } from "react";

interface SectionProps {
  innerSection?: boolean;
  children: React.ReactNode;
  tag?: string;
  className?: string;
  flush?: boolean;
  grid?: boolean;
}

const Section: React.FC<SectionProps> = ({
  innerSection,
  children,
  tag = "div",
  className = "",
  flush = false,
  grid = false,
}) => {
  const containerClass = new ClassName([className, innerSection ? "inner-container" : "container"]);
  containerClass.addIf("container--flush", flush);
  containerClass.addIf("container--grid", grid);

  return createElement(tag, { className: containerClass.toString() }, children);
};

export default Section;
