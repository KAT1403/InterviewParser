import { useParams } from "react-router-dom";
import Header from "@/widget/Header";
import InterviewResultMetrics from "@/widget/InterviewResultMetrics";
import { useInterviewResult } from "@/features/interview-result";
import styles from "./ResultPage.module.scss";

export default function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const { result, loading, error } = useInterviewResult(id);

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <div>{error}</div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <div>Result not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <InterviewResultMetrics data={result} />
      </div>
    </div>
  );
}
