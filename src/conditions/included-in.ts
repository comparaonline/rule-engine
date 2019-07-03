import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';
import { Description } from '../interfaces/Description';

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

  describe(): Description {
    return {
      ...this.baseDecription(),
      text: '{{first}} is included in {{second}}'
    };
  }

  protected test(left: any, right: any): boolean {
    return right.includes(left.toString());
  }
}
