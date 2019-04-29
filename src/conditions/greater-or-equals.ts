import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';

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
  static canDeserialize(obj: Serialized): obj is GreaterOrEqualsSerialized {
    return obj.class === 'GreaterOrEquals';
  }

  protected test(left: any, right: any): boolean {
    return left >= right;
  }
}
