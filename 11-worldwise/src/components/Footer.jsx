import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer calssName={styles.footer}>
      <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
    </footer>
  );
}

export default Footer;
