import { Page } from "@/types/graphql";
import React from "react";
import DefaultSchema from "./Schemas/DefaultSchema";
import HomepageSchema from "./Schemas/HomepageSchema";
import ProductSchema from "./Schemas/ProductSchema";

const Schema: React.FC<{ page: Page }> = ({ page }) => {
  // const { schemas } = page?.schema || {};

  // const schemasToRender = Array.isArray(schemas) ? schemas : ["webpage"];

  const schemaMap: Record<string, React.ReactNode> = {
    webpage: <DefaultSchema page={page} />,
    homepage: <HomepageSchema />,
    product: <ProductSchema page={page} />,
  };

  // if (schemasToRender.length > 0) {
  //   return (
  //     <>
  //       {schemasToRender.map((schemaName, index) => (
  //         <React.Fragment key={index}>
  //           {(schemaName && schemaMap[schemaName]) || <DefaultSchema page={page} />}
  //         </React.Fragment>
  //       ))}
  //     </>
  //   );
  // }

  return <DefaultSchema page={page} />;
};

export default Schema;
