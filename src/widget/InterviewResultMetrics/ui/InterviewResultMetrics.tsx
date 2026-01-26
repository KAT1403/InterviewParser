import type { InterviewResultData } from "@/entities/interview";
import InterviewResultActions from "./InterviewResultActions";
import InterviewResultKeyMetrics from "./InterviewResultKeyMetrics";
import InterviewResultQuestions from "./InterviewResultQuestions";
import InterviewResultSummary from "./InterviewResultSummary";
import styles from "./InterviewResultMetrics.module.scss";

interface InterviewResultMetricsProps {
  data: InterviewResultData;
}

export default function InterviewResultMetrics({
  data,
}: InterviewResultMetricsProps) {
  return (
    <div>
      <div className={styles.pageTitle}>
        <h1>Interview Results</h1>
      </div>

      <div className={styles.container}>
        <InterviewResultSummary
          interviewId={data.interviewId}
          totalScore={data.totalScore}
          candidateLevel={data.candidateLevel}
          aiSummary={data.aiSummary}
          verdict={data.verdict}
        />
        <InterviewResultKeyMetrics metrics={data.metrics} />
        <InterviewResultQuestions questions={data.questions} />
      </div>
      <InterviewResultActions />
    </div>
  );
}
