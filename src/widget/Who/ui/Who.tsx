import styles from "./Who.module.scss";
import { useNavigate } from "react-router-dom";

function Who() {
  const navigate = useNavigate();
  return (
    <div className={styles.content}>
      <h2>Who is it for</h2>
      <div className={styles.left}>
        <img src="/img/Who1.png" alt="Who1" />
        <h3>For HR/Recruiter</h3>
        <p className={styles.description}>
          Automate initial technical screening, obtain an objective assessment
          of candidate skills, and reduce hiring time without overloading your
          team.
        </p>
        <ul>
          <li>AI conducts interviews for you</li>
          <li>Standardized assessment</li>
          <li>Ready-to-use report for each candidate</li>
        </ul>
        <div className={styles.buttons}>
          <button className={styles.demoBtn}>Request a demo</button>
          <button className={styles.secBtn}>View a sample report</button>
        </div>
      </div>

      <div className={styles.right}>
        <img src="/img/Who2.png" alt="Who1" />
        <h3>For Candidates</h3>
        <p className={styles.description}>
          Take a technical interview in a real-life format, find out your level,
          and get an AI-powered analysis of your answers.
        </p>
        <ul>
          <li>Questions like in a real interview</li>
          <li>Feedback on answers</li>
          <li>Understanding strengths and weaknesses</li>
        </ul>
        <button
          className={styles.takeBtn}
          onClick={() => navigate("/interview")}
        >
          Take interview
        </button>
      </div>
    </div>
  );
}

export default Who;
