import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';
import { Description } from '../interfaces/description';

interface EqualsSerialized extends Serialized {
  class: 'Equals';
  left: Serialized;
  right: Serialized;
}

export class Equals extends BaseCondition {
  static deserialize(obj: EqualsSerialized) {
    return new Equals(
      inputSelectorDeserializer.deserialize(obj.left),
      inputSelectorDeserializer.deserialize(obj.right)
    );
  }

  describe(): Description {
    return {
      ...this.baseDecription(),
      text: '{{first}} is equal to {{second}}'
    };
  }

  protected test(left: any, right: any): boolean {
    return left.toString() === right.toString();
  }
}
