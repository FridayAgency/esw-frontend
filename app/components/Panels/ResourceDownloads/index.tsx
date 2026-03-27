import { PagePanelsPagePanelsResourceDownloadsLayout } from "@/types/graphql";
import styles from "./ResourceDownloads.module.scss";
import Container from "../../Container";
import Button from "../../Button";

export const RESOURCEDOWNLOADS_FRAGMENT = `
  title

  resources {
    resourceTitle
    file {
      node {
          sourceUrl
      }
    }
  }
`;

const ResourceDownloads: React.FC<{ panel: PagePanelsPagePanelsResourceDownloadsLayout }> = ({ panel }) => {
  const { title, resources } = panel || {};
  return (
    <section className={styles["resource-downloads"]}>
      <Container className={styles["resource-downloads__container"]}>
        <div className={styles["resource-downloads__inner"]}>
          <svg
            className={styles["resource-downloads__icon"]}
            width={79}
            height={81}
            viewBox="0 0 79 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M39.5 0C92.1698 0.896806 92.1635 79.2496 39.5 80.1401C-13.1698 79.2433 -13.1635 0.890445 39.5 0Z"
              fill="#DEEBE5"
            />
            <path
              d="M33.6488 22.2617H23.6822C22.5819 22.2617 21.6914 23.1522 21.6914 24.2525V38.2007C21.6914 39.301 22.5819 40.1915 23.6822 40.1915H33.6488C34.7491 40.1915 35.6396 39.301 35.6396 38.2007V24.2525C35.6396 23.1522 34.7491 22.2617 33.6488 22.2617Z"
              stroke="#1E2221"
              strokeWidth={1.83107}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M55.5654 22.2597H45.5987C44.4984 22.2597 43.6079 23.1501 43.6079 24.2505C44.0086 26.0123 42.3104 32.3472 45.5987 32.22H55.5654C56.6657 32.22 57.5562 31.3295 57.5562 30.2292C57.1555 28.4674 58.8537 22.1325 55.5654 22.2597Z"
              stroke="#1E2221"
              strokeWidth={1.83107}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M55.5668 40.1914H45.6002C44.4998 40.1914 43.6094 41.0819 43.6094 42.1822V56.1304C43.6094 57.2307 44.4998 58.1212 45.6002 58.1212H55.5668C56.6672 58.1212 57.5576 57.2307 57.5576 56.1304V42.1822C57.5576 41.0819 56.6672 40.1914 55.5668 40.1914Z"
              stroke="#1E2221"
              strokeWidth={1.83107}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M33.6493 48.162H23.6827C22.5824 48.162 21.6919 49.0525 21.6919 50.1528C22.0926 51.9146 20.3944 58.2495 23.6827 58.1223H33.6493C34.7497 58.1223 35.6401 57.2319 35.6401 56.1316C35.2394 54.3697 36.9376 48.0348 33.6493 48.162Z"
              stroke="#1E2221"
              strokeWidth={1.83107}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M35.5812 27.9847C38.8822 27.9339 38.8822 33.1239 35.5812 33.073C32.2802 33.1239 32.2802 27.9339 35.5812 27.9847Z"
              fill="#00D180"
              stroke="#1E2221"
              strokeWidth={1.83107}
            />
          </svg>
          <div className={styles["resource-downloads__content"]}>
            {title && <h2 className={styles["resource-downloads__title"]}>{title}</h2>}
            {resources && resources.length > 0 && (
              <ul className={styles["resource-downloads__list"]}>
                {resources.map((resource, index) => {
                  if (!resource?.file?.node?.sourceUrl || !resource?.resourceTitle) return null;
                  return (
                    <li key={index} className={styles["resource-downloads__item"]}>
                      <a href={resource.file.node.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M18.661 10.9194L17.2207 9.48037L11.8207 14.9098V0H9.78165V14.9098L4.38165 9.48037L2.94141 10.9194L10.8011 18.8098L18.661 10.9194Z"
                            fill="#00D180"
                          />
                          <path
                            d="M19.5597 16.3516V21.9613H2.04024V16.3516H0V24.0016H21.6V16.3516H19.5597Z"
                            fill="#00D180"
                          />
                        </svg>

                        {resource.resourceTitle}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ResourceDownloads;
