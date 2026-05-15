import { Campaign, CaseStudy, Industry, Page, Product } from "@/types/graphql";

const siteUrl = process.env.NEXT_PUBLIC_LOCAL_URL ?? "";
const backendUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? "";

type SchemaNode = Page | Product | CaseStudy | Industry | Campaign;

type NodeWithSeo = SchemaNode & {
  seo?: {
    title?: string | null;
    metaDesc?: string | null;
    breadcrumbs?: Array<{ text?: string | null; url?: string | null } | null> | null;
  } | null;
};

function absoluteUrl(path?: string | null): string {
  if (!path) return siteUrl;
  return path.startsWith("http") ? path : `${siteUrl}${path}`;
}

function schemaIds(uri: string) {
  const url = absoluteUrl(uri);
  return {
    pageUrl: url,
    webpageId: `${url}#webpage`,
    breadcrumbId: `${url}#breadcrumb`,
    organizationId: `${siteUrl}/#organization`,
    websiteId: `${siteUrl}/#website`,
    creativeWorkId: `${url}#creativework`,
    productId: `${url}#product`,
  };
}

function buildBreadcrumbs(node: NodeWithSeo, breadcrumbId: string) {
  const items = (node.seo?.breadcrumbs ?? []).map((crumb, i) => ({
    "@type": "ListItem" as const,
    position: i + 1,
    name: crumb?.text ?? "",
    item: (crumb?.url ?? "").replace(backendUrl, siteUrl),
  }));

  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: items,
  };
}

function buildWebPage(node: NodeWithSeo, ids: ReturnType<typeof schemaIds>, mainEntityId?: string) {
  return {
    "@type": "WebPage",
    "@id": ids.webpageId,
    url: ids.pageUrl,
    name: node.seo?.title ?? node.title ?? "",
    description: node.seo?.metaDesc ?? "",
    isPartOf: { "@id": ids.websiteId },
    about: { "@id": ids.organizationId },
    breadcrumb: { "@id": ids.breadcrumbId },
    inLanguage: "en-US",
    datePublished: node.date ?? "",
    dateModified: (node as CaseStudy).modified ?? "",
    ...(mainEntityId && { mainEntity: { "@id": mainEntityId } }),
    potentialAction: [{ "@type": "ReadAction", target: [ids.pageUrl] }],
  };
}

// ─── Schema builders ──────────────────────────────────────────────────────────

function buildHomepageSchema() {
  const ids = schemaIds("/");

  return [
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "Corporation"],
      "@id": ids.organizationId,
      name: "ESW",
      url: siteUrl,
      description:
        "ESW provides cross-border e-commerce solutions, enabling retailers to sell internationally with ease. Services include localized checkout, global fulfillment, and international returns management.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3 Dublin Landings, N Wall Quay, North Wall",
        addressLocality: "Dublin",
        addressCountry: "IE",
        postalCode: "D01 C4E0",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+353-1-880 9114",
          contactType: "sales",
          areaServed: "Worldwide",
          availableLanguage: "English",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/esw/",
        "https://vimeo.com/eswglobal",
        "https://www.instagram.com/eswglobal/",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": ids.websiteId,
      url: siteUrl,
      name: "ESW",
      publisher: { "@type": "Organization", "@id": ids.organizationId },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": ids.breadcrumbId,
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }],
    },
  ];
}

function buildProductSchema(node: NodeWithSeo) {
  const ids = schemaIds(node.uri ?? "/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": ids.productId,
        name: node.title ?? "",
        description: node.seo?.metaDesc ?? "",
        url: ids.pageUrl,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          url: ids.pageUrl,
        },
        provider: {
          "@type": "Organization",
          "@id": ids.organizationId,
          name: "ESW",
        },
      },
      buildWebPage(node, ids, ids.productId),
      buildBreadcrumbs(node, ids.breadcrumbId),
    ],
  };
}

function buildCaseStudySchema(node: CaseStudy & NodeWithSeo) {
  const ids = schemaIds(node.uri ?? "/");
  const categories = node.caseStudyCategories?.edges?.map((edge: any) => edge?.node?.name).filter(Boolean);
  const cardCopy = node.caseStudyCard?.cardCopy ?? null;
  const image = node.featuredImage?.node?.sourceUrl;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.creativeWorkId,
        headline: node.title ?? "",
        description: node.seo?.metaDesc ?? node.excerpt?.replace(/<[^>]+>/g, "") ?? "",
        ...(cardCopy && { abstract: cardCopy }),
        url: ids.pageUrl,
        ...(image && { image: { "@type": "ImageObject", url: image } }),
        datePublished: node.date ?? "",
        dateModified: node.modified ?? "",
        inLanguage: "en-US",
        author: { "@type": "Organization", "@id": ids.organizationId },
        publisher: { "@type": "Organization", "@id": ids.organizationId },
        isPartOf: { "@id": ids.websiteId },
        ...(categories &&
          categories.length > 0 && {
            keywords: categories,
            articleSection: categories[0],
          }),
      },
      buildWebPage(node, ids, ids.creativeWorkId),
      buildBreadcrumbs(node, ids.breadcrumbId),
    ],
  };
}

function buildDefaultSchema(node: NodeWithSeo) {
  const ids = schemaIds(node.uri ?? "/");

  return {
    "@context": "https://schema.org",
    "@graph": [buildWebPage(node, ids), buildBreadcrumbs(node, ids.breadcrumbId)],
  };
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

export function getSchemaForNode(
  typename: string | undefined | null,
  pageUri: string,
  node: SchemaNode,
): object | object[] {
  if (pageUri === "/") return buildHomepageSchema();

  const n = node as NodeWithSeo;

  switch (typename) {
    case "Product":
      return buildProductSchema(n);
    case "CaseStudy":
      return buildCaseStudySchema(node as CaseStudy & NodeWithSeo);
    default:
      return buildDefaultSchema(n);
  }
}
