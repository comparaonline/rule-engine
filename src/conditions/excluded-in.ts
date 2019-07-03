import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';
import { Description } from '../interfaces/Description';

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

  describe(): Description {
    return {
      ...this.baseDecription(),
      text: '{{first}} is not included in {{second}}'
    };
  }
  protected test(left: any, right: any): boolean {
    return !right.includes(left.toString());
  }
}
