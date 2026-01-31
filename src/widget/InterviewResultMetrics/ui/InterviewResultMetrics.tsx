import { useState } from "react";
import { interviewApi } from "@/entities/interview/api/interviewApi";
import type { InterviewResultData } from "@/entities/interview";
import { Modal } from "@/shared/ui/Modal";
import Button from "@/shared/ui/Button";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await interviewApi.deleteMockInterview(data.interviewId);
      window.location.href = "/management";
    } catch (error) {
      console.error("Failed to delete interview:", error);
    }
  };
  return (
    <div>
      <div className={styles.pageTitle}>
        <h1>Interview Results</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className={styles.deleteButton}
        >
          Delete this interview
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modalContent}>
          <p>Are you sure you want to delete this interview?</p>
          <div className={styles.modalActions}>
            <Button
              onClick={handleDelete}
              className={styles.modalButtonPrimary}
            >
              Yes
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              className={styles.modalButtonSecondary}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>

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
