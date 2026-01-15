import styles from "./How.module.scss";

function How() {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>How it works</h2>
      <div className={styles.steps}>

        <div className={styles.step}>
          <h4>Record or Upload</h4>
          <p>
            Capture audio directly or upload existing interview files in various
            formats
          </p>
        </div>

        <img src="/img/RightArrow.svg" alt="RightArrow" className={styles.image} />

        <div className={styles.step}>
          <h4>AI Transcription</h4>
          <p>Advanced AI converts speech to text with high accuracy</p>
        </div>

        <img src="/img/RightArrow.svg" alt="RightArrow" className={styles.image} />

        <div className={styles.step}>
          <h4>Smart Analysis</h4>
          <p>
            Extract questions, evaluate answers, and provide detailed feedback
          </p>
        </div>

        <img src="/img/RightArrow.svg" alt="RightArrow" className={styles.image} />

        <div className={styles.step}>
          <h4>View Analytics</h4>
          <p>Track performance trends and improve your interview skills</p>
        </div>
      </div>
    </div>
  );
}

export default How;
