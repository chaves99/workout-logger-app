export interface WorkoutRequest {
  description: string;
  begining: string;
  finish: string;
  exercises: ExerciseRequest[];
}

export interface ExerciseRequest {
  name: string;
  executions: ExecutionRequest[];
}

export interface ExecutionRequest {
  weight: number;
  reps: number;
  order: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}
