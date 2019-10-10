export const range = (max: number) => [...Array(max).keys()];
export const tryOrFalse = (fn: () => boolean | Promise<boolean>) => {
  try {
    return fn();
  } catch (e) {
    return false;
  }
};

const separator = (level: number) => `\n${'  '.repeat(level + 1) }- `;

export const displayList = (list: string[], level: number) =>
  separator(level).concat(list.join(separator(level)));
