import styles from "./How.module.scss";

function How() {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>How it works</h2>
      <div className={styles.steps}>

        <div className={styles.step}>
          <h4>Step 1</h4>
          <p>
            Fill in your candidate details
          </p>
        </div>

        <img src="/img/RightArrow.svg" alt="RightArrow" className={styles.image} />

        <div className={styles.step}>
          <h4>Step 2</h4>
          <p>AI analyzes your profile and generates interview questions</p>
        </div>

        <img src="/img/RightArrow.svg" alt="RightArrow" className={styles.image} />

        <div className={styles.step}>
          <h4>Step 3</h4>
          <p>
            Join the live AI-powered interview
          </p>
        </div>

        <img src="/img/RightArrow.svg" alt="RightArrow" className={styles.image} />

        <div className={styles.step}>
          <h4>Step 4</h4>
          <p>Receive detailed feedback and performance analysis</p>
        </div>
      </div>
    </div>
  );
}

export default How;
