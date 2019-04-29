import { defined } from './defined';
import { pathToProperties } from './pathToProperties';

const field = /^[a-zA-Z_0-9]*$/;
const condition = /^([a-zA-Z_0-9\.\[\]]*)=(.*)$/;

export const accessor = <T extends Object>(val: keyof T & string) => (obj: T) => {
  if (field.test(val)) {
    return defined(obj) ? obj[val] : undefined;
  }
  if (condition.test(val) && obj instanceof Array) {
    const result = condition.exec(val) as RegExpExecArray;
    const [, left, value] = result;
    const findAccessor = pathToProperties(left).map(accessor);
    return obj.find((each) => {
      const element: any = findAccessor.reduce((a, b) => b(a as any), each);
      return defined(element) ? (element.toString() === value) : false;
    });
  }
  throw new Error(`Unknown accessor type: ${val}`);
};
