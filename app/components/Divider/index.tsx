import { ClassName } from "@fridayagency/classnames";
import styles from "./Divider.module.scss";

interface DividerProps {
  colour?: "white" | "signal-green" | "foundation-green";
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ colour = "signal-green", className: customClassName }) => {
  const className = new ClassName([styles.divider, styles[`divider--${colour}`]]);

  if (customClassName) {
    className.add(customClassName);
  }

  return <div className={className.toString()}></div>;
};

export default Divider;
