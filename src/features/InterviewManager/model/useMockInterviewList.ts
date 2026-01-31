import { useState, useEffect } from "react";
import { interviewApi } from "@/shared/api";

export interface InterviewTableData {
  id: number;
  date: string;
  questions: number;
  answered: number;
  totalQuestions: number;
  avgAccuracy: number;
  status: string;
}

export const useMockInterviewList = () => {
  const [interviews, setInterviews] = useState<InterviewTableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setIsLoading(true);
        const mockInterviews = await interviewApi.getMockInterviews();

        const enhancedDataPromises = mockInterviews.map(async (interview) => {
          let qaCount = 0;
          let answeredCount = 0;
          let avgAccuracy = 0;

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
              avgAccuracy = result.average_accuracy;
            }
          } catch (error) {
            console.error(error);
          }

          return {
            id: interview.id,
            date: new Date(interview.created_at).toLocaleDateString("ru-RU"),
            questions: qaCount,
            answered: answeredCount,
            totalQuestions: qaCount,
            avgAccuracy: avgAccuracy,
            status: interview.status,
          };
        });

        const formattedData = await Promise.all(enhancedDataPromises);
        setInterviews(formattedData);
      } catch (e) {
        setError("Failed to fetch interviews");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  return { interviews, isLoading, error };
};
