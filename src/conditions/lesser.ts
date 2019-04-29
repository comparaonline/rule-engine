import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';

interface LesserSerialized extends Serialized {
  class: 'Lesser';
  left: Serialized;
  right: Serialized;
}

export class Lesser extends BaseCondition {
  static deserialize(obj: LesserSerialized) {
    return new Lesser(
      inputSelectorDeserializer.deserialize(obj.left),
      inputSelectorDeserializer.deserialize(obj.right)
    );
  }
  static canDeserialize(obj: Serialized): obj is LesserSerialized {
    return obj.class === 'Lesser';
  }

  protected test(left: any, right: any): boolean {
    return left < right;
  }
}
