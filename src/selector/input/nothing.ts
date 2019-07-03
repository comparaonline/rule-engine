import { BaseInputSelector } from './base';
import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';
import { Description } from '../../interfaces/description';

export interface NothingSelectorSerialized extends Serialized {
  class: 'NothingSelector';
}

export class NothingSelector extends BaseInputSelector
  implements Serializable<NothingSelectorSerialized> {

  static deserialize() {
    return new this();
  }

  serialize(): NothingSelectorSerialized {
    return {
      class: 'NothingSelector'
    };
  }

  describe(): Description {
    return {
      text: `nothing`
    };
  }

  apply() {
    return null;
  }
}
