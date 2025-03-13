export interface questionType {
  correctOption: number;
  id: string;
  options: string[];
  points: number;
  question: string;
}

export interface questionState {
  questions: questionType[];
  currentQuestion: number;
  totalPoints: number;
  currentOption: number | null;
  isStarted: boolean;
  isAnswered: boolean;
  status: string;
  error: string;
}
