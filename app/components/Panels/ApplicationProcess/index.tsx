import { PagePanelsPagePanelsApplicationProcessLayout } from "@/types/graphql";
import App from "next/app";
import ApplicationProcessClient from "./ApplicationProcessClient";

export const APLICATION_PROCESS_FRAGMENT = `
 ... on PagePanelsPagePanelsApplicationProcessLayout {
          title
          process {
            title
            copy
          }
          image {
            ...AcfMediaItem
          }
        }
          `;

interface ApplicationProcessProps {
  panel: PagePanelsPagePanelsApplicationProcessLayout;
}

const ApplicationProcess: React.FC<ApplicationProcessProps> = ({ panel }) => {
  return <ApplicationProcessClient panel={panel} />;
};

export default ApplicationProcess;
