import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';
import { Description } from '../interfaces/description';

interface LesserOrEqualsSerialized extends Serialized {
  class: 'LesserOrEquals';
  left: Serialized;
  right: Serialized;
}

export class LesserOrEquals extends BaseCondition {
  static deserialize(obj: LesserOrEqualsSerialized) {
    return new LesserOrEquals(
      inputSelectorDeserializer.deserialize(obj.left),
      inputSelectorDeserializer.deserialize(obj.right)
    );
  }

  describe(): Description {
    return {
      ...this.baseDecription(),
      text: '{{first}} is lesser or equal than {{second}}'
    };
  }
  protected test(left: any, right: any): boolean {
    return left <= right;
  }
}
