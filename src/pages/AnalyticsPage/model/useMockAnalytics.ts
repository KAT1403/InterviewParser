import { useState, useEffect } from "react";
import { interviewApi, type GlobalAnalytics } from "@/shared/api";

export const useMockAnalytics = () => {
  const [analytics, setAnalytics] = useState<GlobalAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const mockInterviews = await interviewApi.getMockInterviews();

        let totalInterviews = 0;
        let totalQuestions = 0;
        let totalAnswered = 0;
        let totalAccuracySum = 0;
        let bestScore = 0;
        let bestId = 0;
        let worstScore = 100;
        let worstId = 0;
        let interviewsWithResults = 0;
        const detailsPromises = mockInterviews.map(async (interview) => {
          let qaCount = 0;
          let answeredCount = 0;
          let accuracy = 0;
          let hasResult = false;

          try {
            const qaList = await interviewApi.getMockInterviewQA(interview.id);
            qaCount = qaList.length;
            answeredCount = qaList.filter((q) => q.is_answered).length;
          } catch (error) {
            console.error(error);
          }

          try {
            if (interview.status === "finished") {
              const result = await interviewApi.getMockInterviewResult(
                interview.id,
              );
              accuracy = result.average_accuracy;
              hasResult = true;
            }
          } catch (error) {
            console.error(error);
          }

          return {
            id: interview.id,
            qaCount,
            answeredCount,
            accuracy,
            hasResult,
          };
        });

        const results = await Promise.all(detailsPromises);

        results.forEach((res) => {
          totalInterviews++;
          totalQuestions += res.qaCount;
          totalAnswered += res.answeredCount;

          if (res.hasResult) {
            interviewsWithResults++;
            totalAccuracySum += res.accuracy;

            if (res.accuracy >= bestScore) {
              bestScore = res.accuracy;
              bestId = res.id;
            }
            if (res.accuracy <= worstScore) {
              worstScore = res.accuracy;
              worstId = res.id;
            }
          }
        });
        if (interviewsWithResults === 0) {
          worstScore = 0;
        }

        const globalAvgAccuracy =
          interviewsWithResults > 0
            ? Math.round(totalAccuracySum / interviewsWithResults)
            : 0;

        const globalAnsweredPercent =
          totalQuestions > 0
            ? Math.round((totalAnswered / totalQuestions) * 100)
            : 0;

        const analyticsData: GlobalAnalytics = {
          total_interviews: totalInterviews,
          total_questions: totalQuestions,
          total_answered: totalAnswered,
          total_unanswered: totalQuestions - totalAnswered,
          global_answered_percent: globalAnsweredPercent,
          global_answered_accuracy: globalAvgAccuracy,
          global_average_accuracy: globalAvgAccuracy,
          best_interview_id: bestId,
          best_interview_score: bestScore,
          worst_interview_id: worstId,
          worst_interview_score: worstScore,
          last_updated: new Date().toISOString(),
        };

        setAnalytics(analyticsData);
      } catch (error) {
        console.error("Failed to calculate analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { analytics, loading };
};
