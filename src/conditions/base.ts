import { Input } from '../input';
import { BaseInputSelector } from '../selector/input/base';
import { Serialized } from '../interfaces/serialized';
import { tryOrFalse } from '../lib/helpers';
import { Serializable } from '../interfaces/serializable';
import { Describable } from '../interfaces/describable';
import { Description } from '../interfaces/Description';

const INTEGER = /^(0|[1-9]\d*)$/;
const FLOAT = /^(0|[1-9]\d*)\.\d+$/;

export abstract class BaseCondition implements Serializable<Serialized>, Describable {
  constructor(
    private left: BaseInputSelector,
    private right: BaseInputSelector
  ) { }

  static canDeserialize(obj: Serialized): boolean {
    return obj.class === this.name;
  }
  abstract describe(): Description;
  baseDecription(): Partial<Description> {
    return {
      includes: [
        this.left.describe(),
        this.right.describe()
      ]
    };
  }
  apply(input: Input): boolean {
    const left = this.checkType(this.left.apply(input));
    const right = this.checkType(this.right.apply(input));
    return tryOrFalse(() => this.test(left, right));
  }

  checkType(value: any) {
    if (typeof value === 'string') {
      if (INTEGER.test(value)) {
        return parseInt(value, 10);
      }
      if (FLOAT.test(value)) {
        return parseFloat(value);
      }
    }
    return value;
  }

  serialize(): Serialized {
    return {
      class: this.constructor.name,
      left: this.left.serialize(),
      right: this.right.serialize()
    } as Serialized;
  }

  protected abstract test(left: any, right: any): boolean;
}
