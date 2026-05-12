import { Page } from "@/types/graphql";
import { createBreadcrumbSchema, generateSchemaIds, renderSchema } from "../utils";

interface ProductSchemaProps {
  page: Page;
}

const ProductSchema = ({ page }: ProductSchemaProps) => {
  const ids = generateSchemaIds(page.uri || "/");
  const productId = `${ids.pageUrl}#product`;

  const schemaObject = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LoanOrCredit", "FinancialProduct"],
        "@id": productId,
        name: page.title || "",
        description: page.seo?.metaDesc || "",
        url: ids.pageUrl,
        provider: {
          "@type": "Organization",
          "@id": ids.organizationId,
          name: "ESW",
          url: ids.websiteId,
        },
        areaServed: {
          "@type": "Country",
          name: "Ireland",
        },
        currency: "EUR",
        feesAndCommissionsSpecification:
          "https://www.capitalflow.ie/terms-and-conditions",
      },
      {
        "@type": "WebPage",
        "@id": ids.webpageId,
        url: ids.pageUrl,
        name: page.seo?.title || page.title || "",
        isPartOf: { "@id": ids.websiteId },
        about: { "@id": ids.organizationId },
        mainEntity: { "@id": productId },
        description: page.seo?.metaDesc || "",
        breadcrumb: { "@id": ids.breadcrumbId },
        inLanguage: "en-IE",
        datePublished: page.date || "",
        dateModified: page.modified || "",
      },
      createBreadcrumbSchema(page, ids.breadcrumbId),
    ],
  };

  return renderSchema(schemaObject);
};

export default ProductSchema;
