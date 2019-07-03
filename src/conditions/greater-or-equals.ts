import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';
import { Description } from '../interfaces/Description';

interface GreaterOrEqualsSerialized extends Serialized {
  class: 'GreaterOrEquals';
  left: Serialized;
  right: Serialized;
}

export class GreaterOrEquals extends BaseCondition {
  static deserialize(obj: GreaterOrEqualsSerialized) {
    return new GreaterOrEquals(
      inputSelectorDeserializer.deserialize(obj.left),
      inputSelectorDeserializer.deserialize(obj.right)
    );
  }

  describe(): Description {
    return {
      ...this.baseDecription(),
      text: '{{first}} is greater or equal than {{second}}'
    };
  }

  protected test(left: any, right: any): boolean {
    return left >= right;
  }
}
