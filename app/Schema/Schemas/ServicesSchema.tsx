import {
  // CompanyDetails,
  Page,
  // PagePanelsPagePanelsTestimonialsLayout,
  // SchemaSchemasServicesLayout,
} from "@/types/graphql";
import { createBreadcrumbSchema, generateSchemaIds, renderSchema } from "../utils";

interface ServicesSchemaProps {
  // serviceSchema: SchemaSchemasServicesLayout;
  page: Page;
  // companyData: CompanyDetails;
}

const ServicesSchema = ({
  //serviceSchema,
  page,
  //companyData
}: ServicesSchemaProps) => {
  const ids = generateSchemaIds(page.uri || "/");

  // Find the testimonials panel from page panels
  // const testimonialsPanel = page.pagePanels?.pagePanels?.find(
  //   (panel): panel is PagePanelsPagePanelsTestimonialsLayout =>
  //     panel && "__typename" in panel && panel.__typename === "PagePanelsPagePanelsTestimonialsLayout"
  // );
  // const firstTestimonial = testimonialsPanel?.testimonials?.[0];

  const schemaObject = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": ids.serviceId,
        name: page.title || "",
        description: page.seo?.metaDesc || "",
        provider: { "@id": ids.organizationId },
        areaServed: "Global",
        // ...(serviceSchema.knowsAbout &&
        //   serviceSchema.knowsAbout.length > 0 && {
        //     knowsAbout: serviceSchema.knowsAbout.map((item) => item.knowsAboutItem),
        //   }),
        // ...(serviceSchema.offerCatalogue &&
        //   serviceSchema.offerCatalogue.length > 0 &&
        //   serviceSchema.offerCatalogue[0]?.services &&
        //   serviceSchema.offerCatalogue[0].services.length > 0 && {
        //     hasOfferCatalog: {
        //       "@type": "OfferCatalog",
        //       name: serviceSchema.offerCatalogue[0].title || `${page.title} Services`,
        //       itemListElement: serviceSchema.offerCatalogue[0].services.map((service) => ({
        //         "@type": "Offer",
        //         itemOffered: { "@type": "Service", name: service?.serviceTitle || "" },
        //       })),
        //     },
        //   }),
        // ...(firstTestimonial && {
        //   review: {
        //     "@type": "Review",
        //     author: {
        //       "@type": "Person",
        //       name: firstTestimonial.testimonialAuthor || "",
        //     },
        //     ...(firstTestimonial.testimonialJobTitle && {
        //       publisher: {
        //         "@type": "Organization",
        //         name: firstTestimonial.testimonialJobTitle,
        //       },
        //     }),
        //     reviewBody: firstTestimonial.testimonialCopy || "",
        //   },
        // }),
      },
      {
        "@type": "WebPage",
        "@id": ids.webpageId,
        url: ids.pageUrl,
        name: page.seo?.title || page.title || "",
        isPartOf: { "@id": ids.websiteId },
        about: { "@id": ids.organizationId },
        mainEntity: { "@id": ids.serviceId },
        description: page.seo?.metaDesc || "",
        breadcrumb: { "@id": ids.breadcrumbId },
        inLanguage: "en-IE",
        datePublished: page.date,
        dateModified: page.modified,
      },
      createBreadcrumbSchema(page, ids.breadcrumbId),
    ],
  };

  return renderSchema(schemaObject);
};

export default ServicesSchema;
