import React from "react";
import Container from "../../Container";

import styles from "./StatsBlock.module.scss";

interface ListItemProps {
  title: string;
  value: string;
  description: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, value, description }) => {
  return (
    <li className={styles["stats-block__list-item"]}>
      <p className={styles["stats-block__list-item-title"]}>{title}</p>
      <h2 className={styles["stats-block__list-item-value"]}>{value}</h2>
      <p className={styles["stats-block__list-item-description"]}>{description}</p>
    </li>
  );
};

interface StatsBlockProps {}

const StatsBlock: React.FC<StatsBlockProps> = () => {
  return (
    <section className={styles["stats-block"]}>
      <Container className={styles["stats-block__container"]}>
        <ul className={styles["stats-block__list"]}>
          <ListItem title="EXPAND INTO" value="50+" description="Markets" />
          <ListItem title="OPERATING ACROSS" value="45+" description="Regulatory Environments" />
          <ListItem title="POWERING PROGRAMMES IN" value="27" description="Countries" />
        </ul>
      </Container>
    </section>
  );
};

export default StatsBlock;
