export const range = (max: number) => [...Array(max).keys()];
export const tryOrFalse = (fn: () => boolean) => {
  try {
    return fn();
  } catch (e) {
    return false;
  }
};
