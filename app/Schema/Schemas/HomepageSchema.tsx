import { generateSchemaIds, renderSchema } from "../utils";

const HomepageSchema = () => {
  const ids = generateSchemaIds("/");

  const schemaObject = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ids.organizationId,
      name: "ESW",
      url: "https://www.capitalflow.ie",
      // logo: {
      //   "@type": "ImageObject",
      //   url: "https://www.capitalflow.ie/images/capitalflow-logo.png",
      //   width: 200,
      //   height: 60,
      // },
      description:
        "ESW provides asset finance and property finance solutions to Irish businesses, sole traders and SMEs.",
      // foundingDate: "2015",
      areaServed: { "@type": "Country", name: "Ireland" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Block A, The Crescent Building, Northwood Business Park, Santry Demesne",
        addressLocality: "Dublin",
        addressCountry: "IE",
        postalCode: "D09 X8W3",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+353-1-563 2400",
          contactType: "customer service",
          areaServed: "IE",
          availableLanguage: "English",
          name: "Santry Office",
        },
        {
          "@type": "ContactPoint",
          telephone: "+353-1 544 0271",
          contactType: "customer service",
          areaServed: "IE",
          availableLanguage: "English",
          name: "Baggot Street Office",
        },
      ],
      parentOrganization: {
        "@type": "Organization",
        name: "bunq",
        url: "https://www.bunq.com",
      },
      sameAs: [
        "https://www.linkedin.com/company/capitalflow",
        "https://www.facebook.com/capitalflow.ie/",
        "https://x.com/ESW_IRL",
      ],
    },
    // 2. WebSite — enables Sitelinks Searchbox. Homepage only.
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": ids.websiteId,
      url: ids.pageUrl,
      name: "ESW",
      publisher: {
        "@type": "Organization",
        "@id": ids.organizationId,
      },
    },
    // 3. BreadcrumbList — homepage is a single item
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": ids.breadcrumbId,
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: ids.pageUrl }],
    },
    // 4. FinancialService — primary homepage entity, drives Knowledge Panel
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "@id": `${ids.pageUrl}#financialservice`,
      name: "ESW",
      url: ids.pageUrl,
      description:
        "Ireland's leading specialist finance provider offering asset finance, equipment finance, and property finance to Irish businesses and SMEs.",
      telephone: "+353-1-563 2400",
      // priceRange: "€€",
      areaServed: { "@type": "Country", name: "Ireland" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Block A, The Crescent Building, Northwood Business Park, Santry Demesne",
        addressLocality: "Dublin",
        addressCountry: "IE",
        postalCode: "D09 X8W3",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      parentOrganization: {
        "@type": "Organization",
        "@id": ids.organizationId,
      },
    },
  ];

  return renderSchema(schemaObject);
};

export default HomepageSchema;
