import { PagePanelsPagePanelsStats, PagePanelsPagePanelsStatsBlockLayout } from "@/types/graphql";
import StatsBlockClient from "./StatsBlockClient";

export const STATS_BLOCK_FRAGMENT = `

          stats {
            description
            title
            stat
          }

`;

interface StatsBlockProps {
  panel: PagePanelsPagePanelsStatsBlockLayout;
}

const StatsBlock: React.FC<StatsBlockProps> = ({ panel }) => {
  const { stats } = panel || {};

  if (!stats || stats.length === 0) {
    return null; // Don't render the component if there are no stats
  }

  return <StatsBlockClient stats={stats as PagePanelsPagePanelsStats[]} />;
};

export default StatsBlock;
