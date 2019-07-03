import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';
import { Description } from '../interfaces/Description';

interface GreaterSerialized extends Serialized {
  class: 'Greater';
  left: Serialized;
  right: Serialized;
}

export class Greater extends BaseCondition {
  static deserialize(obj: GreaterSerialized) {
    return new Greater(
      inputSelectorDeserializer.deserialize(obj.left),
      inputSelectorDeserializer.deserialize(obj.right)
    );
  }

  describe(): Description {
    return {
      ...this.baseDecription(),
      text: '{{first}} is greater than {{second}}'
    };
  }

  protected test(left: any, right: any): boolean {
    return left > right;
  }
}
