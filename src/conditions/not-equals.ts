import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';
import { Description } from '../interfaces/Description';

interface NotEqualsSerialized extends Serialized {
  class: 'NotEquals';
  left: any;
  right: any;
}
export class NotEquals extends BaseCondition {
  static deserialize(obj: NotEqualsSerialized) {
    return new NotEquals(
      inputSelectorDeserializer.deserialize(obj.left),
      inputSelectorDeserializer.deserialize(obj.right)
    );
  }

  describe(): Description {
    return {
      ...this.baseDecription(),
      text: '{{first}} is not equal to {{second}}'
    };
  }
  test(left: any, right: any) {
    return left !== right;
  }
}
