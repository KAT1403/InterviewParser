import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InterviewSettings.module.scss";
import { interviewApi } from "@/entities/interview/api/interviewApi";
import { type CreateMockInterviewRequest } from "@/shared/api";

function InterviewSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateMockInterviewRequest>({
    purpose: "practice",
    specialty: "",
    target_grade: "Middle",
    candidate_cv: "",
    vacancy_description: "",
  });

  const handleChange = (
    field: keyof CreateMockInterviewRequest,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStart = async () => {
    if (
      !formData.candidate_cv ||
      !formData.vacancy_description ||
      !formData.specialty
    ) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const interview = await interviewApi.createMockInterview(formData);
      navigate(`/voice-interview/${interview.id}`);
    } catch (error) {
      console.error("Failed to create interview", error);
      alert("Failed to start interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.settings}>
      <h2>Interview settings</h2>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.field}>
          <label>Your CV</label>
          <textarea
            className={styles.bigarea}
            value={formData.candidate_cv}
            onChange={(e) => handleChange("candidate_cv", e.target.value)}
            placeholder="Paste your CV here..."
          />
        </div>
        <div className={styles.field}>
          <label>Job Description</label>
          <textarea
            className={styles.bigarea}
            value={formData.vacancy_description}
            onChange={(e) =>
              handleChange("vacancy_description", e.target.value)
            }
            placeholder="Paste job description here..."
          />
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Specialization</label>
            <input
              className={styles.smallarea}
              value={formData.specialty}
              onChange={(e) => handleChange("specialty", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label>Experience level</label>
            <select
              className={styles.select}
              value={formData.target_grade}
              onChange={(e) => handleChange("target_grade", e.target.value)}
            >
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
          </div>
        </div>
        <button
          type="button"
          className={styles.startButton}
          onClick={handleStart}
          disabled={loading}
        >
          {loading ? "Starting..." : "Start voice interview"}
        </button>
      </form>
    </div>
  );
}

export default InterviewSettings;
