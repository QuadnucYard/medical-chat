export interface SharedLink {
  create_time: string;
  expire_time: string;
  max_uses: int;
  use_times: int;
  readonly: boolean;
  valid: boolean;
  id: string;
}
