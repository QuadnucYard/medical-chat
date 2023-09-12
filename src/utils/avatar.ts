import type { User } from "@/api/user";

export function getUserAvatar(user?: User) {
  return user && user.avatar_url.length > 0
    ? import.meta.env.VITE_APP_BASE_API + "/" + user.avatar_url
    : "/img/default-user.png";
}
