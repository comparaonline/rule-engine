export const defined = <T>(val: T | undefined | null): val is T=>
  val !== undefined && val !== null;
