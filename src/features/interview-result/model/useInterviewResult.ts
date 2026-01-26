import { useEffect, useState } from "react";
import { interviewApi } from "@/shared/api";
import {
  mapInterviewToResult,
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

        const apiResult = await interviewApi.getInterview(Number(id));
        const transformedResult = mapInterviewToResult(apiResult);

        setResult(transformedResult);
      } catch (fetchError) {
        console.error("Ошибка запроса:", fetchError);
        setError("Не удалось загрузить результат интервью");
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  return { result, loading, error };
};
