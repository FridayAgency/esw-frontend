import { ClassName } from "@fridayagency/classnames";
import styles from "./Divider.module.scss";

interface DividerProps {
  colour?: "white" | "signal-green" | "foundation-green";
}

const Divider: React.FC<DividerProps> = ({ colour = "signal-green" }) => {
  const className = new ClassName([styles.divider, styles[`divider--${colour}`]]);

  return <div className={className.toString()}></div>;
};

export default Divider;
