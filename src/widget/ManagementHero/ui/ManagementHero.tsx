import FileUploader from "@/features/FileUploader";
import styles from "./ManagementHero.module.scss";

export default function ManagementHero() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <h1 className={styles.title}>Interview Management</h1>
          <p className={styles.subtitle}>
            Manage and review all conducted interviews
          </p>
        </div>
        <div className={styles.rightSide}>
          <FileUploader />
        </div>
      </div>
    </div>
  );
}
