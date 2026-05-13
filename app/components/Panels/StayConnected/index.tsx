import { PagePanelsPagePanelsStayConnectedLayout } from "@/types/graphql";
import StayConnectedClient from "./StayConnectedClient";

export const STAY_CONNECTED_FRAGMENT = `
  copy
  title
`;

interface StayConnectedProps {
  panel?: PagePanelsPagePanelsStayConnectedLayout;
}

const StayConnected: React.FC<StayConnectedProps> = ({ panel }) => {
  const { title, copy } = panel || {};
  return <StayConnectedClient title={title ?? undefined} copy={copy ?? undefined} />;
};

export default StayConnected;
