import { v4 } from "uuid";

import { LoginPayload } from "@/types/graphql";
import apiClient from "./client";

export type Auth = {
  login: LoginPayload;
};

export const GET_AUTH_TOKEN = `
  mutation LOGIN($input: LoginInput!) {
    login(input: $input) {
      authToken
    }
  }
`;

const API_URL = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

export const getAuthToken = async (): Promise<Auth> => {
  // Validate credentials are configured
  if (!process.env.WORDPRESS_USERNAME || !process.env.WORDPRESS_PASSWORD) {
    throw new Error("WordPress credentials not configured");
  }

  try {
    const data = await apiClient.query(GET_AUTH_TOKEN, {
      variables: {
        input: {
          clientMutationId: v4(),
          username: process.env.WORDPRESS_USERNAME,
          password: process.env.WORDPRESS_PASSWORD,
        },
      },
    });

    if (!data?.login?.authToken) {
      throw new Error("Authentication failed: No token received from WordPress");
    }

    return data;
  } catch (error) {
    console.error("WordPress authentication error:", error);
    throw new Error("Failed to authenticate with WordPress");
  }
};
