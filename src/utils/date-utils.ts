import { date } from "quasar";

export function dateFormatter(field: string) {
  return (row: any) => formatDate(row[field]);
}

export function formatDate(dat: string) {
  return date.formatDate(new Date(dat), "YYYY-MM-DD HH:mm:ss");
}
