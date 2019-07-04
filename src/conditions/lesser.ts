import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { inputSelectorDeserializer } from '../selector/input/deserializer';
import { Description } from '../interfaces/description';

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

  describe(): Description {
    return {
      ...this.baseDecription(),
      text: '{{first}} is lesser than {{second}}'
    };
  }

  protected test(left: any, right: any): boolean {
    return left < right;
  }
}
