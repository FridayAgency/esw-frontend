import { CaseStudy } from "@/types/graphql";
import { createBreadcrumbSchema, generateSchemaIds, renderSchema } from "../utils";

const CaseStudySchema: React.FC<{ caseStudy: CaseStudy }> = ({ caseStudy }) => {
  const ids = generateSchemaIds(caseStudy.uri || "/");

  const categories = caseStudy.caseStudyCategories?.edges?.map((edge: any) => edge?.node?.name).filter(Boolean);
  // const clientName = caseStudy.caseStudyFields?.clientName;
  // const quote = caseStudy.caseStudyFields?.quote;

  const schemaObject = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": ids.creativeWorkId,
        name: caseStudy.title || "",
        description: caseStudy.seo?.metaDesc || caseStudy.excerpt?.replace(/<[^>]+>/g, "") || "",
        url: ids.pageUrl,
        image: caseStudy.featuredImage?.node?.sourceUrl || "",
        datePublished: caseStudy.date || "",
        dateModified: caseStudy.modified || "",
        publisher: { "@type": "Organization", "@id": ids.organizationId },
        ...(categories && categories.length > 0 && { keywords: categories }),
        // ...(clientName && {
        //   about: {
        //     "@type": "Organization",
        //     name: clientName,
        //   },
        // }),
        // ...(quote && clientName && {
        //   review: {
        //     "@type": "Review",
        //     author: {
        //       "@type": "Organization",
        //       name: clientName,
        //     },
        //     reviewBody: quote,
        //   },
        // }),
      },
      {
        "@type": "WebPage",
        "@id": ids.webpageId,
        url: ids.pageUrl,
        name: caseStudy.seo?.title || caseStudy.title || "",
        isPartOf: { "@id": ids.websiteId },
        about: { "@id": ids.organizationId },
        mainEntity: { "@id": ids.creativeWorkId },
        description: caseStudy.seo?.metaDesc || "",
        breadcrumb: { "@id": ids.breadcrumbId },
        inLanguage: "en-IE",
        datePublished: caseStudy.date || "",
        dateModified: caseStudy.modified || "",
      },
      createBreadcrumbSchema(caseStudy as any, ids.breadcrumbId),
    ],
  };

  return renderSchema(schemaObject);
};

export default CaseStudySchema;
