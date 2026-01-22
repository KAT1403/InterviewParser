import Header from "@/widget/Header";
import styles from "./ProfilePage.module.scss";
import ProfileInfo from "@/widget/ProfileInfo";

export default function InterviewPage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1>Account settings</h1>
        <ProfileInfo />
      </div>
    </div>
  );
}
