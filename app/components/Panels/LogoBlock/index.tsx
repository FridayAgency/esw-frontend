import { MediaItem, PagePanelsPagePanelsLogoBlockLayout } from "@/types/graphql";
import Logos from "./Logos";

export const LOGO_BLOCK_FRAGMENT = `
    logos {
      edges {
        ...AcfMediaItem
      }
    }
`;

interface LogoBlockProps {
  panel: PagePanelsPagePanelsLogoBlockLayout;
}

const LogoBlock: React.FC<LogoBlockProps> = ({ panel }) => {
  const { logos } = panel || {};

  if (!logos || logos.edges.length === 0) {
    return null;
  }

  return <Logos logos={logos.edges.map((edge) => edge.node) as MediaItem[]} />;
};

export default LogoBlock;
