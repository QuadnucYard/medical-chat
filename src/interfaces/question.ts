export interface ChatQuestion {
  question: string;
  hint: string;
}

type Counter = { [key: string]: int };

export interface QuestionStats {
  word: Counter;
  intent: Counter;
  entity: Counter;
}
