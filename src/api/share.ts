import api from "./request";

export interface Share {
  create_time: string;
  expire_time: string;
  max_uses: int;
  use_times: int;
  readonly: boolean;
  valid: boolean;
  id: string;
}

export async function createShare(share_data: any) {
  return (await api.post<Share>("/share/", share_data)).data;
}
