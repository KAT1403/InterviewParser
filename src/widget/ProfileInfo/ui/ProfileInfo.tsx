import { Link } from "react-router-dom";
import styles from "./ProfileInfo.module.scss";

function ProfileInfo() {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h4>Profile information</h4>
        <p>Manage your personal details</p>
      </div>
      <Link to="#">Edit</Link>
      <div className={styles.block}>
        <p>Name</p>
        <p>Gaziz Sembekov</p>
      </div>
      <div className={styles.block}>
        <p>Email</p>
        <p>gaziz123@gmail.com</p>
      </div>
      <div className={styles.block}>
        <p>Registered</p>
        <p className={styles.date}>Jan. 21, 2026</p>
      </div>
    </div>
  );
}

export default ProfileInfo;
