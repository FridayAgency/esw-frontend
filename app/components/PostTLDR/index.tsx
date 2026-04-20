import { PostfieldsTldr } from "@/types/graphql";
import styles from "./PostTLDR.module.scss";
import Container from "../Container";

interface PostTLDRProps {
  tldr: PostfieldsTldr[];
}

const PostTLDR: React.FC<PostTLDRProps> = ({ tldr }) => {
  return (
    <aside className={styles["postTldr"]}>
      <Container className={styles["postTldr__container"]}>
        <div className={styles["postTldr__card"]}>
          <p className={styles["postTldr__title"]}>TL;DR</p>
          <ul className={styles["postTldr__list"]}>
            {tldr?.map((item, index) => {
              if (!item || !item.listItem) return null;

              return <li key={`${item.listItem}-${index}`}>{item.listItem}</li>;
            })}
          </ul>
        </div>
      </Container>
    </aside>
  );
};

export default PostTLDR;
