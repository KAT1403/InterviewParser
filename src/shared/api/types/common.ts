export interface ApiError {
  [key: string]: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface DateFilter {
  dateFrom?: string;
  dateTo?: string;
}