import { AcfMediaItemConnectionEdge, Maybe, PagePanelsPagePanelsIconBlockLayout } from "@/types/graphql";
import Button from "../../Button";
import Container from "../../Container";
import TextRevealHeading from "../../TextRevealHeading";

import styles from "./IconBlock.module.scss";
import Icon from "../../Icon";
import { ClassName } from "@fridayagency/classnames";
import ImageComponent from "../../ImageComponent";

export const LIST_ICON_FRAGMENT = `
  title
  list {
    title
    icon
    copy
     iconImg{
    ...AcfMediaItem
 }
  }
  callToAction {
    ...AcfLinkFragment
  }



`;

interface ListItemProps {
  icon: string | Maybe<string>[];
  title: string;
  copy: string;
  img: Maybe<AcfMediaItemConnectionEdge> | null;
}

export const ListItem: React.FC<ListItemProps> = ({ icon, title, copy, img }) => {
  const imgUrl = img?.node;

  return (
    <li className={styles["icon-block__list-item"]}>
      {imgUrl ? <ImageComponent image={img?.node} /> : icon && <Icon type={icon?.[0] as any} />}
      {title && <h3 className={styles["icon-block__list-item-title"]}>{title}</h3>}
      {copy && <p className={styles["icon-block__list-item-copy"]}>{copy}</p>}
    </li>
  );
};

interface IconBlockProps {
  panel: PagePanelsPagePanelsIconBlockLayout;
}

const IconBlock: React.FC<IconBlockProps> = ({ panel }) => {
  const { title, list, callToAction } = panel;

  const listClass = new ClassName(styles["icon-block__list"]);

  if (list && list.length > 3) {
    listClass.add(styles["icon-block__list--columns"]);
  }

  return (
    <section className={styles["icon-block"]}>
      <Container className={styles["icon-block__container"]}>
        {title && (
          <div className={styles["icon-block__heading"]}>
            <TextRevealHeading blockColour="#00D180">
              <h2>{title}</h2>
            </TextRevealHeading>
          </div>
        )}

        <ul className={listClass.toString()}>
          {list &&
            list.length &&
            list.map((item, index) => {
              if (!item) return null;

              return (
                <ListItem
                  key={index}
                  icon={item.icon ?? ""}
                  title={item.title ?? ""}
                  copy={item.copy ?? ""}
                  img={item.iconImg ?? null}
                />
              );
            })}
        </ul>
        {callToAction && (
          <div className={styles["icon-block__cta"]}>
            <Button variant="outline" href={callToAction.url ?? ""} target={callToAction.target ?? "_self"}>
              {callToAction.title}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default IconBlock;
