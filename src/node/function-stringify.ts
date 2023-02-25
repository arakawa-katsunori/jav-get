export function functionStringify<T extends () => unknown>(func: T): string {
  return `(${func.toString()})()`;
}
