import { BaseInputSelector } from './base';
import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';

export interface NothingSelectorSerialized extends Serialized {
  class: 'NothingSelector';
}

export class NothingSelector extends BaseInputSelector
  implements Serializable<NothingSelectorSerialized> {

  static deserialize() {
    return new this();
  }

  static canDeserialize(obj: Serialized): obj is NothingSelectorSerialized {
    return obj.class === 'NothingSelector';
  }

  serialize(): NothingSelectorSerialized {
    return {
      class: 'NothingSelector'
    };
  }

  apply() {
    return null;
  }
}
