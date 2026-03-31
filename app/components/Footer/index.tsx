import Container from "../Container";

import styles from "./Footer.module.scss";
import Logo from "../Logo";
import Icon from "../Icon";

const Footer: React.FC = async () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles["footer__container"]}>
        <div className={styles["footer__header"]}>
          <Logo />
          <div className={styles["footer__actions-mobile"]}>
            <button type="button" className={styles["footer__cta"]}>
              Talk to Us
            </button>
            <ul className={styles["footer__socials"]}>
              <li className={styles["footer__socials-item"]}>
                <a href="#" aria-label="LinkedIn">
                  <Icon type="linkedIn" />
                </a>
              </li>
              <li className={styles["footer__socials-item"]}>
                <a href="#" aria-label="Vimeo">
                  <Icon type="vimeo" />
                </a>
              </li>
              <li className={styles["footer__socials-item"]}>
                <a href="#" aria-label="Instagram">
                  <Icon type="instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <nav className={styles["footer__nav"]} aria-label="Footer navigation">
          <div className={styles["footer__nav-group"]}>
            <h2 className={styles["footer__nav-heading"]}>Why ESW</h2>
            <ul className={styles["footer__nav-list"]}>
              <li className={styles["footer__nav-item"]}>
                <a href="#">Why Choose ESW</a>
              </li>
              <li className={styles["footer__nav-item"]}>
                <a href="#">About the Company</a>
              </li>
              <li className={styles["footer__nav-item"]}>
                <a href="#">Customer Success Stories</a>
              </li>
            </ul>
          </div>

          <div className={styles["footer__nav-group"]}>
            <div className={styles["footer__nav-sub-group"]}>
              <h2 className={styles["footer__nav-heading"]}>Platform</h2>
              <ul className={styles["footer__nav-list"]}>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Platform Overview</a>
                </li>
              </ul>
            </div>
            <div className={styles["footer__nav-sub-group"]}>
              <h3 className={styles["footer__nav-subheading"]}>Products</h3>
              <ul className={styles["footer__nav-list"]}>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Global Checkout</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Worldwide Omnichannel</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Agentic Commerce</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Commerce Platform Connectors</a>
                </li>
              </ul>
            </div>
            <div className={styles["footer__nav-sub-group"]}>
              <h3 className={styles["footer__nav-subheading"]}>Services</h3>
              <ul className={styles["footer__nav-list"]}>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Merchant of Record</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Growth Services</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Customer Services</a>
                </li>
              </ul>
            </div>
            <div className={styles["footer__nav-sub-group"]}>
              <h3 className={styles["footer__nav-subheading"]}>Ecosystem</h3>
              <ul className={styles["footer__nav-list"]}>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Global Logistics Infrastructure</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Partner Ecosystem</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Partner Integrations</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles["footer__nav-group"]}>
            <h2 className={styles["footer__nav-heading"]}>Solutions</h2>
            <div className={styles["footer__nav-sub-group"]}>
              <h3 className={styles["footer__nav-subheading"]}>Use Cases</h3>
              <ul className={styles["footer__nav-list"]}>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">New Market Launch</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Consolidate Global Commerce Stack</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Improve International Margin</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Simplify Global Operations</a>
                </li>
              </ul>
            </div>
            <div className={styles["footer__nav-sub-group"]}>
              <h3 className={styles["footer__nav-subheading"]}>Role</h3>
              <ul className={styles["footer__nav-list"]}>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Ecommerce</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Operations</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Finance</a>
                </li>
              </ul>
            </div>
            <div className={styles["footer__nav-sub-group"]}>
              <h3 className={styles["footer__nav-subheading"]}>Industries</h3>
              <ul className={styles["footer__nav-list"]}>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Fashion &amp; Apparel</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Luxury</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Beauty</a>
                </li>
                <li className={styles["footer__nav-item"]}>
                  <a href="#">Consumer Electronics</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles["footer__nav-group"]}>
            <ul className={styles["footer__nav-list-secondary"]}>
              <li className={styles["footer__nav-item"]}>
                <a href="#">Resources</a>
              </li>
              <li className={styles["footer__nav-item"]}>
                <a href="#">Careers</a>
              </li>
              <li className={styles["footer__nav-item"]}>
                <a href="#">Blog</a>
              </li>
              <li className={styles["footer__nav-item"]}>
                <a href="#">Newsroom</a>
              </li>
            </ul>
          </div>
        </nav>

        <div className={styles["footer__actions-desktop"]}>
          <button type="button" className={styles["footer__cta"]}>
            Talk to Us
          </button>
          <ul className={styles["footer__socials"]}>
            <li className={styles["footer__socials-item"]}>
              <a href="#" aria-label="LinkedIn">
                <Icon type="linkedIn" />
              </a>
            </li>
            <li className={styles["footer__socials-item"]}>
              <a href="#" aria-label="Vimeo">
                <Icon type="vimeo" />
              </a>
            </li>
            <li className={styles["footer__socials-item"]}>
              <a href="#" aria-label="Instagram">
                <Icon type="instagram" />
              </a>
            </li>
          </ul>
        </div>

        <nav className={styles["footer__legal"]} aria-label="Legal">
          <ul className={styles["footer__legal-list"]}>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Privacy Policy</a>
            </li>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Cookie Settings</a>
            </li>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Terms &amp; Conditions</a>
            </li>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Acceptable Use Policy</a>
            </li>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Modern Slavery Statement</a>
            </li>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Sitemap</a>
            </li>
          </ul>
        </nav>
      </Container>

      <div className={styles["footer__copyright"]}>&copy; {new Date().getFullYear()} ESW</div>
    </footer>
  );
};

export default Footer;
