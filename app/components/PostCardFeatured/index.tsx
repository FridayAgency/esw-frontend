import { Post } from "@/types/graphql";
import Link from "next/link";

import Icon from "../Icon";

import styles from "./PostCardFeatured.module.scss";
import ImageWithTexture from "../ImageWithTexture/Index";
import Image from "next/image";

interface PostCardFeaturedProps {
  post: Post;
}

const PostCardFeatured: React.FC<PostCardFeaturedProps> = ({ post }) => {
  const { uri, title, featuredImage, author, categories } = post;

  return (
    <Link className={styles["card"]} href={uri ?? ""}>
      {featuredImage && (
        <div className={styles["card__image"]}>
          <ImageWithTexture image={featuredImage.node} variant="frame" />
        </div>
      )}

      <div className={styles["card__content"]}>
        {categories?.edges?.[0]?.node?.name && (
          <div className={styles["card__category"]}>{categories.edges[0].node.name}</div>
        )}

        <h2 className={styles["card__title"]}>{title}</h2>

        {author?.node?.name && (
          <div className={styles["card__author"]}>
            {author.node.avatar?.url && (
              <div className={styles["card__author-avatar"]}>
                <Image src={author.node.avatar.url} alt={author.node.name} width={40} height={40} />
              </div>
            )}
            <div className={styles["card__author-name"]}> {author.node.name}</div>
          </div>
        )}

        <span className={styles["card__arrow"]}>
          <Icon type="arrowRight" />
        </span>
      </div>
    </Link>
  );
};

export default PostCardFeatured;
