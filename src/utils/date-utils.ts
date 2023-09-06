import { date } from "quasar";

export function formatDate(dat: string | null) {
  return dat ? date.formatDate(new Date(dat), "YYYY-MM-DD HH:mm:ss") : "";
}
