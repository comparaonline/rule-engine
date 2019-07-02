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

  protected test(left: any, right: any): boolean {
    return left <= right;
  }
}
