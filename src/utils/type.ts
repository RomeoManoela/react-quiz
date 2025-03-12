export interface questionType {
  correctOption: number;
  id: string;
  options: string[];
  points: number;
  question: string;
}

export interface questionsType {
  questions: questionType[];
}

export interface questionState {
  questions: questionType[];
  currentQuestion: number;
  totalPoints: number;
  isAnswered: boolean;
  status: string;
  error: string;
}
