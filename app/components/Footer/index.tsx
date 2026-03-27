import { GET_FOOTER_DATA } from "@/data/fragments";
import client from "@/lib/client";
import { CompanyInformation, Menu, SocialMediaUrLs } from "@/types/graphql";
import Container from "../Container";

import styles from "./Footer.module.scss";
import Icon from "../Icon";
import Button from "../Button";
import { LogoWhite } from "../Logo";

interface FooterData {
  companyInformation: CompanyInformation;
  socialMediaURLs: SocialMediaUrLs;
  footerMenu: Menu;

  mainMenu: Menu;
}

const Footer: React.FC = async () => {
  const { companyInformation, socialMediaURLs, footerMenu, mainMenu } = await client.query<FooterData>(GET_FOOTER_DATA);

  return (
    <footer className={styles.footer}>
      <Container className={styles["footer__container"]}>
        <div className={styles["footer__menu"]}>
          <h2>Menu</h2>
        </div>

        <div className={styles["footer__contact"]}>
          <div className={styles["footer__contact-info"]}>
            <h2>Contact Us</h2>
            <ul className={styles["footer__contact-links"]}>
              <li>
                <a href={`mailto:${companyInformation?.companyInfo?.email}`}>
                  {companyInformation?.companyInfo?.email}
                </a>
              </li>
              <li>
                <a href={`tel:${companyInformation?.companyInfo?.phoneNumber}`}>
                  {companyInformation?.companyInfo?.phoneNumber}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ul className={styles["footer__contact-socials"]}>
              {socialMediaURLs?.socialMediaTags?.xTag && (
                <li>
                  <a
                    href={socialMediaURLs?.socialMediaTags?.xTag}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                  >
                    {" "}
                    <Icon type="x" />{" "}
                  </a>{" "}
                </li>
              )}
              {socialMediaURLs?.socialMediaTags?.linkedinTag && (
                <li>
                  <a
                    href={socialMediaURLs?.socialMediaTags?.linkedinTag}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Icon type="linkedIn" />
                  </a>
                </li>
              )}
              {socialMediaURLs?.socialMediaTags?.facebookTag && (
                <li>
                  <a
                    href={socialMediaURLs?.socialMediaTags?.facebookTag}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Icon type="facebook" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className={styles["footer__contact-cta"]}>
            <Button href="/quick-quote" colour="green">
              Get A Quick Quote
            </Button>
          </div>
        </div>

        <div className={styles["footer__account"]}>
          <h2>My account</h2>
          <a
            href={companyInformation?.companyInfo?.myCapitalFlowLink?.url || "#"}
            target={companyInformation?.companyInfo?.myCapitalFlowLink?.target || "_self"}
            rel={
              companyInformation?.companyInfo?.myCapitalFlowLink?.target === "_blank"
                ? "noopener noreferrer"
                : undefined
            }
          >
            {companyInformation?.companyInfo?.myCapitalFlowLink?.title}
          </a>
        </div>

        <div className={styles["footer__logo"]}>
          <LogoWhite />

          <div className={styles["footer__logo-menus"]}>
            {footerMenu?.menuItems?.edges?.length && (
              <ul className={styles["footer__menu-upper"]}>
                {footerMenu.menuItems.edges.map((item: any) => (
                  <li key={item.node.id}>
                    <a href={item.node.uri || "#"}>{item.node.label}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
      <div className={styles["footer__copyright"]}>
        <p>© {new Date().getFullYear()} Capitalflow</p>
      </div>
    </footer>
  );
};

export default Footer;
