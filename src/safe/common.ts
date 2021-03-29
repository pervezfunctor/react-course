export function keys<T extends Object>(obj: T): ReadonlyArray<keyof T> {
  return Object.keys(obj) as ReadonlyArray<keyof T>
}
