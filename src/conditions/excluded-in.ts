import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';

interface ExcludedInSerialized extends Serialized {
  class: 'ExcludedIn';
  left: Serialized;
  right: Serialized;
}

export class ExcludedIn extends BaseCondition {
  static deserialize(obj: ExcludedInSerialized) {
    return new ExcludedIn(
      inputSelectorDeserializer.deserialize(obj.left),
      inputSelectorDeserializer.deserialize(obj.right)
    );
  }

  protected test(left: any, right: any): boolean {
    return !right.includes(left.toString());
  }
}
