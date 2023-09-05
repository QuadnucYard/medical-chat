export function columnDefaults<T, U>(columns: T[], defaults: U) {
  return columns.map((c) => Object.assign({}, defaults, c));
}
