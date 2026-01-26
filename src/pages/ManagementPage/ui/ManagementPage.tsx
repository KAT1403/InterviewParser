import Header from "@/widget/Header";
import ManagementHero from "@/widget/ManagementHero";
import styles from "./ManagementPage.module.scss";

export default function ManagementPage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <ManagementHero />
      </div>
    </div>
  );
}
