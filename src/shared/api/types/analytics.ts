export interface GlobalAnalytics {
  total_interviews: number;
  total_questions: number;
  total_answered: number;
  total_unanswered: number;
  global_answered_percent: number;
  global_answered_accuracy: number;
  global_average_accuracy: number;
  best_interview_id: number;
  best_interview_score: number;
  worst_interview_id: number;
  worst_interview_score: number;
  last_updated: string;
}

export interface InterviewAnalytics {
  id: number;
  total_questions: number;
  answered_questions: number;
  unanswered_questions: number;
  answered_percentage: number;
  unanswered_percentage: number;
  average_accuracy: number;
  average_answered_accuracy: number;
  high_confidence_questions: number;
  medium_confidence_questions: number;
  low_confidence_questions: number;
  questions_with_reason: number;
  created_at: string;
  updated_at: string;
}