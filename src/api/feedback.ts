import api from "./request";

export interface Feedback {
  content: "string";
  create_time: "2023-09-07T08:45:06.493Z";
  resolve_time: "2023-09-07T08:45:06.493Z";
  id: 0;
  user_id: 0;
  admin_id: 0;
}

export async function updateComplaint(category: string, content: string) {
  return (await api.post<Feedback>("/complaints/", { category, content })).data;
}
