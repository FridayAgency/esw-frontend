import { Post } from "@/types/graphql";
import Link from "next/link";
import Icon from "../Icon";
import Image from "next/image";

import styles from "./PostCard.module.scss";
import ImageWithTexture from "../ImageWithTexture/Index";

interface PostCardProps {
  post: Post;
  postType?: "blog" | "news";
  showDate?: boolean;
  showAuthor?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, postType, showDate, showAuthor }) => {
  const { uri, title, featuredImage, categories, author } = post;

  return (
    <Link className={styles["card"]} href={uri ?? ""}>
      {featuredImage && (
        <div className={styles["card__image"]}>
          <div className={styles["card__image-wrapper"]}>
            <ImageWithTexture image={featuredImage.node} variant="frame" />
          </div>
        </div>
      )}

      <div className={styles["card__content"]}>
        <div className={styles["card__content--meta"]}>
          {postType ? (
            <div className={styles["card__content--category"]}>{postType === "blog" ? "Blog" : "News"}</div>
          ) : null}

          {showDate && post.date && (
            <div className={styles["card__content--date"]}>
              Published {new Date(post.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </div>
          )}
        </div>

        <div className={styles["card__content--header"]}>{<h3>{title}</h3>}</div>

        {showAuthor && author?.node?.name && (
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

export default PostCard;
