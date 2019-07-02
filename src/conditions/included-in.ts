import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';

interface IncludedInSerialized extends Serialized {
  class: 'IncludedIn';
  left: Serialized;
  right: Serialized;
}

export class IncludedIn extends BaseCondition {
  static deserialize(obj: IncludedInSerialized) {
    return new IncludedIn(
      inputSelectorDeserializer.deserialize(obj.left),
      inputSelectorDeserializer.deserialize(obj.right)
    );
  }

  protected test(left: any, right: any): boolean {
    return right.includes(left.toString());
  }
}
