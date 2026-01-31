import { useParams, useNavigate } from "react-router-dom";
import Header from "@/widget/Header";
import styles from "./VoiceInterviewPage.module.scss";
import { InterviewProcess } from "./components/InterviewProcess";

export default function VoiceInterviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const interviewId = id ? parseInt(id, 10) : null;

  const handleInterviewFinished = () => {
    if (interviewId) {
      navigate(`/result/${interviewId}`);
    }
  };

  if (!interviewId) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <div className={styles.error}>
            <h2>Interview Not Found</h2>
            <p>Please start a new interview from the settings page.</p>
            <button onClick={() => navigate("/interview")}>
              Go to Settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <InterviewProcess
          interviewId={interviewId}
          onFinish={handleInterviewFinished}
        />
      </div>
    </div>
  );
}
