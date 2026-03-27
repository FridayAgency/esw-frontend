import { format } from "date-fns";

const DateFormated: React.FC<{ date: string; formatString?: string }> = ({ date, formatString = "dd MMMM yyyy" }) => {
  const dateFormated = format(new Date(date), formatString);
  return <>{dateFormated}</>;
};

export default DateFormated;
