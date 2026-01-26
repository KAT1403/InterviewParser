import CircleProgress from "@/shared/ui/CircleProgress";
import styles from "./AnalyticsMetrics.module.scss";

interface AnalyticsData {
  total_interviews: number;
  total_questions: number;
  total_answered: number;
  global_answered_percent: number;
  global_average_accuracy: number;
  best_interview_id: number;
  best_interview_score: number;
  worst_interview_id: number;
  worst_interview_score: number;
}

interface AnalyticsMetricsProps {
  data: AnalyticsData;
}

export default function AnalyticsMetrics({ data }: AnalyticsMetricsProps) {
  const answerRate = Math.round(data.global_answered_percent);
  const avgAccuracy = Math.round(data.global_average_accuracy);
  const bestScore = data.best_interview_score;
  const worstScore = data.worst_interview_score;

  return (
    <div className={styles.analytics}>
      <h2>Interview analytics</h2>

      <div className={styles.metricsGrid}>
        <div className={styles.metric}>
          <h3>Total interviews</h3>
          <CircleProgress percentage={100} value={data.total_interviews} />
        </div>

        <div className={styles.metric}>
          <h3>Total questions</h3>
          <CircleProgress percentage={100} value={data.total_questions} />
        </div>

        <div className={styles.metric}>
          <h3>Answered questions</h3>
          <CircleProgress percentage={answerRate} value={data.total_answered} />
        </div>

        <div className={styles.metric}>
          <h3>Answer rate Percentage</h3>
          <CircleProgress
            percentage={answerRate}
            value={answerRate}
            isPercentage
          />
        </div>

        <div className={styles.metric}>
          <h3>Average accuracy Percentage</h3>
          <CircleProgress
            percentage={avgAccuracy}
            value={avgAccuracy}
            isPercentage
          />
        </div>

        <div className={styles.metric}>
          <h3>Best interview Score</h3>
          <div className={styles.scoreCard}>
            <div className={styles.scoreId}>ID: #{data.best_interview_id}</div>
            <div className={styles.scoreValue}>
              Score: <span className={styles.bestScore}>{bestScore}%</span>
            </div>
          </div>
        </div>

        <div className={styles.metric}>
          <h3>Worst interview Score</h3>
          <div className={styles.scoreCard}>
            <div className={styles.scoreId}>ID: #{data.worst_interview_id}</div>
            <div className={styles.scoreValue}>
              Score: <span className={styles.worstScore}>{worstScore}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
