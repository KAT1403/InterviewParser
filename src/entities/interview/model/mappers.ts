import type { InterviewWithQA } from "@/shared/api";
import type { InterviewResultData } from "./types";

const getCandidateLevel = (averageAccuracy: number): string => {
  if (averageAccuracy > 80) {
    return "Strong";
  }

  if (averageAccuracy > 60) {
    return "Middle";
  }

  return "Junior";
};

const getConfidenceScore = (averageAccuracy: number): string => {
  if (averageAccuracy > 80) {
    return "High";
  }

  if (averageAccuracy > 60) {
    return "Medium";
  }

  return "Low";
};

export const mapInterviewToResult = (
  interview: InterviewWithQA,
  sessionDuration = "15 min",
): InterviewResultData => {
  const totalQuestions = interview.qa.length;
  const answeredQuestions = interview.qa.filter(
    (item) => item.full_answer && item.full_answer.trim() !== "",
  ).length;
  const averageAccuracy =
    totalQuestions > 0
      ? Math.round(
          interview.qa.reduce((sum, item) => sum + item.accuracy, 0) /
            totalQuestions,
        )
      : 0;

  return {
    interviewId: interview.id,
    totalScore: averageAccuracy,
    candidateLevel: getCandidateLevel(averageAccuracy),
    verdict: averageAccuracy > 70 ? "Suitable" : "Not Suitable",
    aiSummary: `The candidate answered ${answeredQuestions} out of ${totalQuestions} questions with an average accuracy of ${averageAccuracy}%.`,
    metrics: {
      averageAccuracy,
      answeredQuestions,
      totalQuestions,
      confidenceScore: getConfidenceScore(averageAccuracy),
      sessionDuration,
    },
    questions: interview.qa.map((item) => ({
      id: item.id,
      title: item.question,
      score: item.accuracy,
    })),
  };
};
