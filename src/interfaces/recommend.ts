import { UserPartial } from "./user";

export interface Recommendation {
  id: int;
  title: string;
  content: string;
  add_time: string;
}

export interface RecommendationMore extends Recommendation {
  remove_time: string;
  creator: UserPartial;
  remover: UserPartial;
}
