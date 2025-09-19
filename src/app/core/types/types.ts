
export enum StorageKey {
  LOGIN_RESPONSE = "LOGIN_RESPONSE"
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Exercise {
  name: string;
  executions: ExerciseExecution[];
}

export interface ExerciseExecution {
  reps: number;
  weight: number;
}

export interface Workout {
  descrition: string;
  start: Date;
  end: Date;
}

