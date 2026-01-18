import Header from "@/widget/Header";
import styles from "./InterviewPage.module.scss";
import InterviewWelcome from "@/widget/InterwiewWelcome";
import InterviewSettings from "@/widget/InterviewSettings";
import InterviewGuide from "@/widget/InterviewGuide";

export default function InterviewPage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <InterviewWelcome />
        <div className={styles.bottom}>
          <InterviewSettings />
          <InterviewGuide />
        </div>
      </div>
    </div>
  );
}
