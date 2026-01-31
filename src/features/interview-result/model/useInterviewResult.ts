import { useEffect, useState } from "react";
import { interviewApi } from "@/shared/api";
import {
  mapMockInterviewToResult,
  type InterviewResultData,
} from "@/entities/interview";

interface UseInterviewResultState {
  result: InterviewResultData | null;
  loading: boolean;
  error: string | null;
}

export const useInterviewResult = (id?: string): UseInterviewResultState => {
  const [result, setResult] = useState<InterviewResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setResult(null);
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        setLoading(true);
        setError(null);

        const interviewId = Number(id);

        const [apiResult, qa] = await Promise.all([
          interviewApi.getMockInterviewResult(interviewId),
          interviewApi.getMockInterviewQA(interviewId),
        ]);

        const transformedResult = mapMockInterviewToResult(apiResult, qa);

        setResult(transformedResult);
      } catch (fetchError) {
        console.error("Request Error:", fetchError);
        setError(
          "Failed to load interview result (maybe it is still being generated)",
        );
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  return { result, loading, error };
};
