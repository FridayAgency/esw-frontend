import { Page } from "@/types/graphql";
import { createBreadcrumbSchema, createWebPageSchema, generateSchemaIds, renderSchema } from "../utils";

interface DefaultSchemaProps {
  page: Page;
}

const DefaultSchema = ({ page }: DefaultSchemaProps) => {
  const ids = generateSchemaIds(page.uri || "/");

  const schemaObject = {
    "@context": "https://schema.org",
    "@graph": [createWebPageSchema(page, ids), createBreadcrumbSchema(page, ids.breadcrumbId)],
  };

  return renderSchema(schemaObject);
};

export default DefaultSchema;
