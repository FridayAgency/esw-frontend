import client from "@/lib/client";
import BannerClient from "./BannerClient";
import { Page } from "@/types/graphql";

const Banner: React.FC = async () => {
  const { page } = await client.query<{ page: Page }>(`
    query QueryGetBanner {
      page(id: "/", idType: URI) {
        banner {
          bannerText
        }
      }
    }
  `);

  const bannerText = page?.banner?.bannerText ?? "";

  return <BannerClient bannerText={bannerText} />;
};

export default Banner;
