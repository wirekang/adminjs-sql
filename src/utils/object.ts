export function undefinedToNull(v: object) {
  Object.keys(v).forEach((key) => {
    if (v[key] === undefined) {
      v[key] = null;
    }
  });
  return v;
}
