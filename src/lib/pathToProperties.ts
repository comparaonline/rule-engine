const blank = (val: String | undefined | null) =>
  val !== undefined && val !== null && val !== '';

export const pathToProperties = (path: string): string[] => path
  .split(/\.|\[(\d+|[a-zA-Z_0-9\.\[\]]*=.*)\]/)
  .filter(blank);
