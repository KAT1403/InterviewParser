import CircleProgress from "@/shared/ui/CircleProgress";
import type { InterviewResultQuestion } from "@/entities/interview";
import styles from "./InterviewResultMetrics.module.scss";

interface InterviewResultQuestionsProps {
  questions: InterviewResultQuestion[];
}

export default function InterviewResultQuestions({
  questions,
}: InterviewResultQuestionsProps) {
  return (
    <div className={styles.section}>
      <h2>Detailed question analysis</h2>
      <div className={styles.questionsGrid}>
        {questions.map((question) => (
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
  );
}
