import Navigation from "../Navigation";
import styles from "./Header.module.scss";

const Header: React.FC = async () => {
  return (
    <header className={styles.header}>
      <div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
