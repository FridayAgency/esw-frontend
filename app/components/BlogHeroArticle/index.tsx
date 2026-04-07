import Image from "next/image";
import Link from "next/link";
import styles from "./BlogHeroArticle.module.scss";

interface BlogHeroArticleProps {
  category: string;
  title: string;
  authorName: string;
  authorImage: string;
  articleImage: string;
  href: string;
}

const BlogHeroArticle: React.FC<BlogHeroArticleProps> = ({
  category,
  title,
  authorName,
  authorImage,
  articleImage,
  href,
}) => {
  return (
    <Link href={href} className={styles["blog-hero-article"]}>
      <div className={styles["blog-hero-article__image"]}>
        <Image src={articleImage} alt={title} fill sizes="(max-width: 767px) 0px, 400px" style={{ objectFit: "cover" }} />
      </div>
      <div className={styles["blog-hero-article__content"]}>
        <span className={styles["blog-hero-article__category"]}>{category}</span>
        <h3 className={styles["blog-hero-article__title"]}>{title}</h3>
        <div className={styles["blog-hero-article__author"]}>
          <div className={styles["blog-hero-article__avatar"]}>
            <Image src={authorImage} alt={authorName} width={40} height={40} />
          </div>
          <span className={styles["blog-hero-article__author-name"]}>{authorName}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogHeroArticle;
