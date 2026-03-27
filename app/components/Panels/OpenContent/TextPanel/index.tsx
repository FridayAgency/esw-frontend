import Button from "@/app/components/Button";
import Container from "@/app/components/Container/Container";
import Editor from "@/app/components/Editor";

import styles from "./TextPanel.module.scss";

interface TextPanelProps {}

const copy = `
    <h2>Why it's Needed</h2>
      <p>
        <strong>
          ESW localises the checkout experience so international customers can buy as easily as they do at home. Global
          checkout adapts the buying experience to each shopper's market in real time.
        </strong>
      </p>
      <p>
        ESW detects location and automatically applies the correct currency, language, payment methods, taxes, duties,
        and regulatory rules for that country.
      </p>
      <h3>What it does</h3>
      <p>
        Global checkout adapts the buying experience to each shopper's market in real time. ESW detects location and
        automatically applies the correct currency, language, payment methods, taxes, duties, and regulatory rules for
        that country.
      </p>
      <p>
        The checkout integrates directly with a brand's existing ecommerce platform and order flow. Brands keep control
        of the experience while ESW manages the complexity behind the scenes.
      </p>

      <ol>
        <li>Numbered point in list</li>
        <li>Numbered point in list</li>
        <li>Numbered point in list</li>
      </ol>

      <ul>
        <li>Unordered point in list</li>
        <li>Unordered point in list</li>
        <li>Unordered point in list</li>
      </ul>
`;

const TextPanel = () => {
  return (
    <Container tag="section" className={styles["text-panel"]}>
      <Editor content={copy} className={styles["text-panel__content"]} />
      <Button className={styles["text-panel__button"]} variant="outline">
        Call to Action
      </Button>
    </Container>
  );
};

export default TextPanel;
