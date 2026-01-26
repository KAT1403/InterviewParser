import styles from "./InterviewResultMetrics.module.scss";

interface InterviewResultSummaryProps {
  interviewId: number;
  totalScore: number;
  candidateLevel: string;
  aiSummary: string;
  verdict: string;
}

export default function InterviewResultSummary({
  interviewId,
  totalScore,
  candidateLevel,
  aiSummary,
  verdict,
}: InterviewResultSummaryProps) {
  return (
    <div className={styles.summaryGrid}>
      <div className={styles.summaryCard}>
        <h3>Interview score</h3>
        <p>ID: #{interviewId}</p>
        <div className={styles.score}>
          Score: <span className={styles.scoreValue}>{totalScore}%</span>
        </div>
        <p>Candidate level: {candidateLevel}</p>
      </div>

      <div className={styles.summaryCard}>
        <h3>AI Summary:</h3>
        <p>{aiSummary}</p>
      </div>

      <div className={styles.summaryCard}>
        <h3>Verdict:</h3>
        <div className={styles.verdict}>{verdict}</div>
      </div>
    </div>
  );
}
