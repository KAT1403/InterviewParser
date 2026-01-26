import CircleProgress from "@/shared/ui/CircleProgress";
import type { InterviewResultMetrics } from "@/entities/interview";
import styles from "./InterviewResultMetrics.module.scss";

interface InterviewResultKeyMetricsProps {
  metrics: InterviewResultMetrics;
}

export default function InterviewResultKeyMetrics({
  metrics,
}: InterviewResultKeyMetricsProps) {
  return (
    <div className={styles.section}>
      <h2>Key metrics</h2>
      <div className={styles.metricsGrid}>
        <div className={styles.metric}>
          <h3>Average accuracy Percentage</h3>
          <CircleProgress
            percentage={metrics.averageAccuracy}
            value={metrics.averageAccuracy}
            isPercentage
          />
        </div>

        <div className={styles.metric}>
          <h3>Answered questions</h3>
          <CircleProgress
            percentage={100}
            value={`${metrics.answeredQuestions}/${metrics.totalQuestions}`}
          />
        </div>

        <div className={styles.metric}>
          <h3>Confidence score</h3>
          <div className={styles.textMetric}>
            <div className={styles.confidenceValue}>
              {metrics.confidenceScore}
            </div>
          </div>
        </div>

        <div className={styles.metric}>
          <h3>Session duration</h3>
          <div className={styles.textMetric}>
            <div className={styles.durationValue}>
              {metrics.sessionDuration}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
