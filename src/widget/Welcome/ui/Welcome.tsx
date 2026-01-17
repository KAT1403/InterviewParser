import styles from "./Welcome.module.scss";
import Button from "../../../shared/ui/Button";

function Welcome() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Interview Insights</h1>
        <h2>Parser & Analyzer</h2>
        <p className={styles.description}>
          Your intelligent companion for interview preparation, recording, and
          analysis. Transform the way you handle interviews with AI-powered
          insights and real-time feedback.
        </p>
        <div className={styles.blocks}>
          <p>AI-Powered Analysis</p>
          <p>Real-time Recording</p>
          <p>Detailed Analytics</p>
        </div>
        <Button size="large" className={styles.startButton}>Start Interview</Button>
      </div>
      <img src="/img/Welcome.png" alt="Welcome" className={styles.image} />
    </div>
  );
}

export default Welcome;
