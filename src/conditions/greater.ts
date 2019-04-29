import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';

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
  static canDeserialize(obj: Serialized): obj is GreaterSerialized {
    return obj.class === 'Greater';
  }

  protected test(left: any, right: any): boolean {
    return left > right;
  }
}
