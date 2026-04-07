import styles from "./PostTLDR.module.scss";

interface PostTLDRProps {
  items: string[];
  title?: string;
}

const PostTLDR = ({ items, title = "TL;DR" }: PostTLDRProps) => {
  return (
    <aside className={styles.postTldr}>
      <div className={styles.postTldr__card}>
        <p className={styles.postTldr__title}>{title}</p>
        <ul className={styles.postTldr__list}>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default PostTLDR;
