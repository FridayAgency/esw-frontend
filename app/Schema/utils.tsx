import { CareerPost, NewsArticle, Page, Post } from "@/types/graphql";

const URI = process.env.NEXT_PUBLIC_LOCAL_URL || "";
const BACKEND_URI = process.env.NEXT_PUBLIC_WORDPRESS_URL || "";

// Generate common IDs for schema entities
export function generateSchemaIds(pageUri: string) {
  const pageUrl = `${URI}${pageUri}`; // Ensure no double slashes
  return {
    pageUrl,
    webpageId: `${pageUrl}#webpage`,
    breadcrumbId: `${pageUrl}#breadcrumb`,
    serviceId: `${pageUrl}#service`,
    organizationId: `${URI}/#organization`,
    websiteId: `${URI}/#website`,
    creativeWorkId: `${pageUrl}#creativework`,
  };
}

// Generate Organization schema (reusable across schemas)
export function createOrganizationSchema(companyData: any) {
  const schema = companyData.schemaData;
  const social = companyData.socialMedia;

  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": schema?.schemaOrgainsationId || `${URI}/#organization`,
    name: schema?.organisationName || "Friday",
    url: URI,
    logo: {
      "@type": "ImageObject",
      url: schema?.brandLogo?.node?.sourceUrl || "",
      width: "112",
      height: "28",
    },
    image: schema?.metaImage?.node?.sourceUrl || "",
    description: schema?.brandDescription || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: schema?.schemaAddress?.street || "",
      addressLocality: schema?.schemaAddress?.city || "",
      postalCode: schema?.schemaAddress?.eirCode || "",
      addressCountry: schema?.schemaAddress?.country || "IE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: schema?.geoCoordinates?.latitude || 53.339655,
      longitude: schema?.geoCoordinates?.longitude || -6.250558,
    },
    telephone: schema?.mainPhoneNumber || "",
    email: schema?.mainEmail || "",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: schema?.openingHours?.days?.map((d: { day?: string }) => d?.day).filter(Boolean) || [],
      opens: schema?.openingHours?.openingTime || "",
      closes: schema?.openingHours?.closingTime || "",
    },
    sameAs: [social?.linkedin, social?.twitterUrl, social?.instagramUrl].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Friday Digital Services",
      itemListElement:
        schema?.mainServices?.map((service: { name?: string; url?: { url?: string } }) => ({
          "@type": "Service",
          name: service?.name || "",
          url: service?.url?.url || "",
        })) || [],
    },
  };
}

// Generate WebSite schema
export function createWebsiteSchema(companyData: any) {
  const schema = companyData.schemaData;

  return {
    "@type": "WebSite",
    "@id": `${URI}/#website`,
    url: URI,
    name: schema?.organisationName || "Friday",
    publisher: { "@id": schema?.schemaOrgainsationId || `${URI}/#organization` },
  };
}

// Generate WebPage schema
export function createWebPageSchema(
  page: Page,
  ids: ReturnType<typeof generateSchemaIds>,
  options?: {
    mainEntity?: object;
  },
) {
  return {
    "@type": "WebPage",
    "@id": ids.webpageId,
    url: ids.pageUrl,
    name: page.seo?.title || page.title || "",
    isPartOf: { "@id": ids.websiteId },
    about: { "@id": ids.organizationId },
    description: page.seo?.metaDesc || "",
    breadcrumb: { "@id": ids.breadcrumbId },
    inLanguage: "en-IE",
    datePublished: page.date || "",
    dateModified: page.modified || "",
    ...(options?.mainEntity && { mainEntity: options.mainEntity }),
    potentialAction: [
      {
        "@type": "ReadAction",
        target: [ids.pageUrl],
      },
    ],
  };
}

// Generate BreadcrumbList schema
export function createBreadcrumbSchema(page: Page | Post | NewsArticle | CareerPost, breadcrumbId: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: (page.seo?.breadcrumbs || []).map((breadcrumb, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: breadcrumb?.text || "",
      item: breadcrumb?.url?.replace(BACKEND_URI, URI) || "",
    })),
  };
}

// Render script tag helper
export function renderSchema(schemaObject: object) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaObject),
      }}
    />
  );
}
