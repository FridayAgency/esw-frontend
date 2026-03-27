import icons from "./Icons";

interface IconProps {
  type: keyof typeof icons;
}

const Icon: React.FC<IconProps> = ({ type }) => {
  return <>{icons[type]}</>;
};

export default Icon;
