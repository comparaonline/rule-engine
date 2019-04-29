import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';

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
  static canDeserialize(obj: Serialized): obj is LesserOrEqualsSerialized {
    return obj.class === 'LesserOrEquals';
  }

  protected test(left: any, right: any): boolean {
    return left <= right;
  }
}
