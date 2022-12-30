export const isString = function (p: any) {
  if (typeof p == typeof "") return true;
  return false;
}

export const isJsonString = function (p: any) {
  try { JSON.parse(p); }
  catch (e) { return false; }
  return true;
}

export const isPromise = function (p: any) {
  if (
    p !== null &&
    typeof p === 'object' &&
    typeof p.then === 'function' &&
    typeof p.catch === 'function'
  ) return true;
  return false;
}
export const regex = function (text: string, reg: RegExp) {
  let result: string[] = []
  let m: RegExpExecArray | null = null
  do {
    m = reg.exec(text);
    if (m) result.push(m[0])
  } while (m)
  return result
}