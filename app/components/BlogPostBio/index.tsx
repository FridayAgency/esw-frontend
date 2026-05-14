import Image from "next/image";
import Link from "next/link";
import styles from "./BlogPostBio.module.scss";

interface BlogPostBioProps {
  authorName: string;
  authorImage: string;
  bio: string;
  href?: string;
}

const BlogPostBio: React.FC<BlogPostBioProps> = ({ authorName, authorImage, bio, href }) => {
  return (
    <div className={styles["blog-post-bio__card"]}>
      <div className={styles["blog-post-bio__author"]}>
        <div className={styles["blog-post-bio__photo"]}>
          <Image src={authorImage} alt={authorName} width={80} height={80} />
        </div>
        <p suppressHydrationWarning className={styles["blog-post-bio__name"]}>
          {authorName}
        </p>
      </div>
      <div
        suppressHydrationWarning
        className={styles["blog-post-bio__bio"]}
        dangerouslySetInnerHTML={{ __html: bio }}
      />
      {href && (
        <Link href={href} className={styles["blog-post-bio__arrow"]} aria-label="Read more about the author">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 16H26M26 16L18 8M26 16L18 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default BlogPostBio;
