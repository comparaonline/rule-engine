import { BaseInputSelector } from './base';
import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';
import { Description } from '../../interfaces/Description';

export interface StaticListSelectorSerialized extends Serialized {
  value: string;
  class: 'StaticListSelector';
}

export class StaticListSelector extends BaseInputSelector
  implements Serializable<StaticListSelectorSerialized> {
  private value: string[];

  constructor(list: string) {
    super();
    this.value = list.split(/\s*,\s*/).map(x => x.trim());
  }

  static deserialize(obj: StaticListSelectorSerialized) {
    return new this(obj.value);
  }

  describe(): Description {
    return {
      text: `the list [${this.value.join(', ')}]`
    };
  }

  serialize(): StaticListSelectorSerialized {
    return {
      class: 'StaticListSelector',
      value: this.value.join(', ')
    };
  }

  apply() {
    return this.value;
  }
}
