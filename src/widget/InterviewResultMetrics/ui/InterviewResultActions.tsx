import { useNavigate } from "react-router-dom";
import styles from "./InterviewResultMetrics.module.scss";

export default function InterviewResultActions() {
  const navigate = useNavigate();

  const handleStartNewInterview = () => {
    navigate("/interview");
  };

  const handleBackToDashboard = () => {
    navigate("/analytics");
  };

  return (
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
  );
}
