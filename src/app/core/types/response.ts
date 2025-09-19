
export interface Page<T> {
  content: T[];
  page: PageDetails;
}

interface PageDetails {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface WorkoutResponse {
  id: number;
  description: string;
  begining: string;
  finish: string;
  exercises: ExerciseResponse[];
}

export interface ExerciseResponse {
  name: string;
  executions: ExecutionResponse[];
}

export interface ExecutionResponse {
  reps: number;
  weight: number;
  order: number;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  token: string;
  expirationToken: string;
}
