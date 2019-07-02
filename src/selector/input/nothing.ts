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

  serialize(): NothingSelectorSerialized {
    return {
      class: 'NothingSelector'
    };
  }

  apply() {
    return null;
  }
}
