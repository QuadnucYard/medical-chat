export interface AccessToken {
  access_token: string;
  token_type: string;
}

export interface PasswordUpdate {
  old_password: string;
  new_password: string;
}
