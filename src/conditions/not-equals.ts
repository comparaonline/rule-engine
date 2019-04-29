import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';

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
  static canDeserialize(obj: Serialized): obj is NotEqualsSerialized {
    return obj.class === 'NotEquals';
  }
  test(left: any, right: any) {
    return left !== right;
  }
}
