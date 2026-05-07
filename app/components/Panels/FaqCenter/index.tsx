import { PagePanelsPagePanelsFaqCenterLayout } from "@/types/graphql";
import FaqCenterClient from "./FaqCenterClient";
import { Suspense } from "react";

export const FAQ_CENTER_FRAGMENT = `
    faqSection {
    title
    faqs {
        question
        content
        }
    }
`;

interface FaqCenterProps {
  panel: PagePanelsPagePanelsFaqCenterLayout;
}

const FaqCenter: React.FC<FaqCenterProps> = ({ panel }) => {
  const { faqSection } = panel || {};

  const categories = faqSection?.flatMap((faq) => (faq?.title ? [faq.title] : [])) || [];

  return (
    <Suspense>
      <FaqCenterClient categorys={categories} fags={faqSection} />
    </Suspense>
  );
};

export default FaqCenter;
