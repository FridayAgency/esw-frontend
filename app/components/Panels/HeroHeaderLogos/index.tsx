import { PagePanelsPagePanelsHeroHeaderLogosLayout } from "@/types/graphql";
import HeroHeaderLogosClient from "./HeroHeaderLogosClient";
import HeroHeaderLogosMobile from "./HeroHeaderLogosMobile";

export const HEROHEADER_LOGOS_FRAGMENT = `
          logos {
            edges {
              ...AcfMediaItem
            }
          }
`;

interface HeroHeaderLogsProps {
  panel: PagePanelsPagePanelsHeroHeaderLogosLayout;
}

const HeroHeaderLogs: React.FC<HeroHeaderLogsProps> = ({ panel }) => {
  const { logos } = panel || {};

  return (
    <>
      <HeroHeaderLogosMobile logos={logos} />
      <HeroHeaderLogosClient logos={logos} />
    </>
  );
};

export default HeroHeaderLogs;
