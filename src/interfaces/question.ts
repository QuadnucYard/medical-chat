type Counter = { [key: string]: int };

export type QuestionStats = {
  word: Counter;
  intent: Counter;
  entity: Counter;
};
