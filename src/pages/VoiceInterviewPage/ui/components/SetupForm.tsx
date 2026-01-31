import React, { useState } from "react";
import { interviewApi } from "@/entities/interview/api/interviewApi";
import { type CreateMockInterviewRequest } from "@/shared/api";
import styles from "./SetupForm.module.scss";

interface SetupFormProps {
  onInterviewCreated: (id: number) => void;
}

export const SetupForm: React.FC<SetupFormProps> = ({ onInterviewCreated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateMockInterviewRequest>({
    purpose: "practice",
    specialty: "",
    target_grade: "Middle",
    candidate_cv: "",
    vacancy_description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.candidate_cv.trim())
      newErrors.candidate_cv = "Please paste your CV";
    if (!formData.vacancy_description.trim())
      newErrors.vacancy_description = "Please paste the Job Description";
    if (!formData.specialty.trim())
      newErrors.specialty = "Specialization is required";
    if (!formData.target_grade.trim())
      newErrors.target_grade = "Level is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const interview = await interviewApi.createMockInterview(formData);
      onInterviewCreated(interview.id);
    } catch (error) {
      console.error("Failed to create interview:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    field: keyof CreateMockInterviewRequest,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className={styles.settings}>
      <h2>Setup Voice Interview</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Your CV</label>
          <textarea
            className={styles.bigarea}
            value={formData.candidate_cv}
            onChange={(e) => handleChange("candidate_cv", e.target.value)}
            placeholder="Paste your resume text here..."
          />
          {errors.candidate_cv && (
            <span className={styles.errorText}>{errors.candidate_cv}</span>
          )}
        </div>

        <div className={styles.field}>
          <label>Job Description</label>
          <textarea
            className={styles.bigarea}
            value={formData.vacancy_description}
            onChange={(e) =>
              handleChange("vacancy_description", e.target.value)
            }
            placeholder="Paste the job requirements here..."
          />
          {errors.vacancy_description && (
            <span className={styles.errorText}>
              {errors.vacancy_description}
            </span>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Specialization</label>
            <input
              className={styles.smallarea}
              value={formData.specialty}
              onChange={(e) => handleChange("specialty", e.target.value)}
              placeholder="e.g. Frontend Developer"
            />
            {errors.specialty && (
              <span className={styles.errorText}>{errors.specialty}</span>
            )}
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

        <button type="submit" className={styles.startButton} disabled={loading}>
          {loading ? "Creating..." : "Start Interview"}
        </button>
      </form>
    </div>
  );
};
