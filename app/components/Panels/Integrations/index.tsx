import client from "@/lib/client";
import { GET_INTEGRATIONS } from "@/data/fragments";
import { removeNodes } from "@fridayagency/utils";
import { Integration, IntegrationCategory } from "@/types/graphql";
import IntegrationsClient from "./IntegrationsClient";

const Integrations: React.FC = async () => {
  try {
    const { integrations, integrationCategories } = await client.query(GET_INTEGRATIONS);

    const integrationList = integrations ? removeNodes<Integration>(integrations) : [];
    const integrationCategoryList = integrationCategories
      ? removeNodes<IntegrationCategory>(integrationCategories)
      : [];

    return (
      <IntegrationsClient
        integrationList={integrationList}
        integrationCategoryList={integrationCategoryList}
      />
    );
  } catch (error) {
    console.error("Error rendering Integrations component:", error);
    return null;
  }
};

export default Integrations;
