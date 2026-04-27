import Banner from "../Banner";
import Navigation from "../Navigation";
import styles from "./Header.module.scss";

const Header: React.FC = async () => {
  return (
    <header className={styles.header}>
      <Banner />
      <Navigation />
    </header>
  );
};

export default Header;
