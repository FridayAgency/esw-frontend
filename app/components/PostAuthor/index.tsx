import Link from "next/link";
import Image from "next/image";
import Icon from "../Icon";
import styles from "./PostAuthor.module.scss";
import Container from "../Container";

interface PostAuthorProps {
  author: {
    name?: string | null;
    uri?: string | null;
    description?: string | null;
    avatar?: {
      url?: string | null;
    } | null;
  };
}

const PostAuthor: React.FC<PostAuthorProps> = ({ author }) => {
  const { name, uri, description, avatar } = author;

  const inner = (
    <>
      <div className={styles["author__profile"]}>
        {avatar?.url && (
          <div className={styles["author__avatar"]}>
            <Image src={avatar.url} alt={name ?? ""} width={80} height={80} />
          </div>
        )}
        {name && <p className={styles["author__name"]}>{name}</p>}
      </div>

      {description && <div className={styles["author__bio"]} dangerouslySetInnerHTML={{ __html: description }} />}

      <span className={styles["author__arrow"]}>
        <Icon type="arrowRight" />
      </span>
    </>
  );

  if (uri) {
    return (
      <div className={styles["author"]}>
        <Container className={styles["author__container"]}>
          <Link className={styles["author__inner"]} href={uri}>
            {inner}
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles["author"]}>
      <Container className={styles["author__container"]}>
        <div className={styles["author__inner"]}>{inner}</div>
      </Container>
    </div>
  );
};

export default PostAuthor;
