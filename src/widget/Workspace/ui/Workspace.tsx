import styles from "./Workspace.module.scss";
import Button from "../../../shared/ui/Button";

function Workspace() {
  return (
    <div className={styles.content}>
      <h2>Workspace</h2>
      <div className={styles.blocks}>
        <div className={styles.block}>
          <h4>Upload & Transcribe</h4>
          <p>
            Transform your audio and video interviews into text with
            cutting-edge AI transcription. Perfect for processing recorded
            interviews from any source.
          </p>
          <ul>
            <li>Drag & drop interface</li>
            <li>Multiple format support (MP3, WAV, M4A, MP4, MOV, AVI)</li>
            <li>Automatic question extraction</li>
            <li>Real-time processing progress</li>
            <li>Instant transcription and analysis</li>
          </ul>
          <Button size="small">Upload Files→</Button>
        </div>

        <div className={styles.block}>
          <h4>Voice Interview</h4>
          <p>
            Experience natural voice conversations with an AI interviewer. Speak
            your answers and receive real-time feedback with advanced speech
            recognition.
          </p>
          <ul>
            <li>Real-time voice conversation</li>
            <li>Multiple AI voices available</li>
            <li>Audio device management</li>
            <li>Live transcription display</li>
            <li>Comprehensive voice analytics</li>
          </ul>
          <Button size="small">Start Voice Session→</Button>
        </div>

        <div className={styles.block}>
          <h4>Interview Management</h4>
          <p>
            Organize, review, and manage all your interview data in one place.
            Edit questions, track accuracy, and monitor your progress over time.
          </p>
          <ul>
            <li>View all interview history</li>
            <li>Edit questions and answers</li>
            <li>Track accuracy scores</li>
            <li>Filter by date range</li>
            <li>Export interview data</li>
          </ul>
          <Button size="small">Manage Interviews→</Button>
        </div>

        <div className={styles.block}>
          <h4>Analytics Dashboard</h4>
          <p>
            Gain deep insights into your interview performance with
            comprehensive analytics, trends, and detailed metrics to track your
            improvement and areas for development.
          </p>
          <ul>
            <li>Performance trends over time</li>
            <li>Accuracy score analysis</li>
            <li>Question category breakdown</li>
            <li>Best and worst interview highlights</li>
            <li>Custom date range filtering</li>
          </ul>
          <Button size="small">View Analytics→</Button>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
