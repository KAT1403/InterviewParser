import { useNavigate } from "react-router-dom";
import CircleProgress from "@/shared/ui/CircleProgress";
import styles from "./InterviewResultMetrics.module.scss";

interface QuestionData {
  id: number;
  title: string;
  score: number;
}

interface MetricsData {
  averageAccuracy: number;
  answeredQuestions: number;
  totalQuestions: number;
  confidenceScore: string;
  sessionDuration: string;
}

interface InterviewResultData {
  interviewId: number;
  totalScore: number;
  candidateLevel: string;
  verdict: string;
  aiSummary: string;
  metrics: MetricsData;
  questions: QuestionData[];
}

interface InterviewResultMetricsProps {
  data: InterviewResultData;
}

export default function InterviewResultMetrics({
  data,
}: InterviewResultMetricsProps) {
  const navigate = useNavigate();

  const handleStartNewInterview = () => {
    navigate("/interview");
  };

  const handleBackToDashboard = () => {
    navigate("/analytics");
  };

  return (
    <div>
      <div className={styles.pageTitle}>
        <h1>Interview Results</h1>
      </div>

      <div className={styles.container}>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <h3>Interview score</h3>
            <p>ID: #{data.interviewId}</p>
            <div className={styles.score}>
              Score:{" "}
              <span className={styles.scoreValue}>{data.totalScore}%</span>
            </div>
            <p>Candidate level: {data.candidateLevel}</p>
          </div>

          <div className={styles.summaryCard}>
            <h3>AI Summary:</h3>
            <p>{data.aiSummary}</p>
          </div>

          <div className={styles.summaryCard}>
            <h3>Verdict:</h3>
            <div className={styles.verdict}>{data.verdict}</div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Key metrics</h2>
          <div className={styles.metricsGrid}>
            <div className={styles.metric}>
              <h3>Average accuracy Percentage</h3>
              <CircleProgress
                percentage={data.metrics.averageAccuracy}
                value={data.metrics.averageAccuracy}
                isPercentage
              />
            </div>

            <div className={styles.metric}>
              <h3>Answered questions</h3>
              <CircleProgress
                percentage={100}
                value={`${data.metrics.answeredQuestions}/${data.metrics.totalQuestions}`}
              />
            </div>

            <div className={styles.metric}>
              <h3>Confidence score</h3>
              <div className={styles.textMetric}>
                <div className={styles.confidenceValue}>
                  {data.metrics.confidenceScore}
                </div>
              </div>
            </div>

            <div className={styles.metric}>
              <h3>Session duration</h3>
              <div className={styles.textMetric}>
                <div className={styles.durationValue}>
                  {data.metrics.sessionDuration}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Detailed question analysis</h2>
          <div className={styles.questionsGrid}>
            {data.questions.map((question) => (
              <div key={question.id} className={styles.questionCard}>
                <h4>Question {question.id}:</h4>
                <p>{question.title}</p>
                <CircleProgress
                  percentage={question.score}
                  value={question.score}
                  isPercentage
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.primaryButton}
          onClick={handleStartNewInterview}
        >
          Start new interview
        </button>
        <button
          className={styles.secondaryButton}
          onClick={handleBackToDashboard}
        >
          Back to dashboard
        </button>
      </div>
    </div>
  );
}
