import createClient from "@fridayagency/graphql-client";

const apiUrl = process.env.WORDPRESS_GRAPHQL_ENDPOINT || "";

const client = createClient(apiUrl);

export default client;
