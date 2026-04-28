import Image from "next/image";
import styles from "./AuthorHero.module.scss";
import { User } from "@/types/graphql";
import Container from "../Container";
import Icon from "../Icon";

interface AuthorHeroProps {
  author: User;
}

const AuthorHero: React.FC<AuthorHeroProps> = ({ author }) => {
  const { name, description, avatar, authorCustomFields } = author || {};
  return (
    <section className={styles["hero"]}>
      <Container className={styles["hero__container"]}>
        <div className={styles["hero__profile"]}>
          {avatar?.url && (
            <div className={styles["hero__avatar"]}>
              <Image src={avatar?.url} alt="" width={140} height={140} />
            </div>
          )}
          <div className={styles["hero__identity"]}>
            <h1 className={styles["hero__name"]}>{name}</h1>
            {authorCustomFields?.jobRole && <p className={styles["hero__title"]}>{authorCustomFields.jobRole}</p>}
          </div>
        </div>

        <div className={styles["hero__about"]}>
          <p className={styles["hero__about-label"]}>About</p>
          {description && <p className={styles["hero__bio"]}>{description}</p>}
          {authorCustomFields?.linkedinUrl && (
            <a
              href={authorCustomFields.linkedinUrl}
              className={styles["hero__linkedin"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon type="linkedIn" />
              <span>LinkedIn Profile</span>
            </a>
          )}
        </div>
      </Container>
    </section>
  );
};

export default AuthorHero;
