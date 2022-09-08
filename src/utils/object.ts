export function undefinedToNull(v: object) {
  Object.keys(v).forEach((key) => {
    if (v[key] === undefined) {
      v[key] = null;
    }
  });
  return v;
}

export function lowerCaseProperty(v: object): any {
  const r = {};
  Object.keys(v).forEach((key) => {
    r[key.toLowerCase()] = v[key];
  });
  return r;
}
