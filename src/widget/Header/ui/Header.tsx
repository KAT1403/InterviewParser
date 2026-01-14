import styles from "./Header.module.scss";

function Header() {
  return (
    <div className={styles.header}>
      <h3>Interview P&A</h3>
      <div className={styles.line}>
        <h5>Voice interview</h5>
        <h5>Analytics</h5>
        <h5>Profile</h5>
      </div>
    </div>
  );
}

export default Header;
