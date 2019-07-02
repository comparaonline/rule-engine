import { BaseInputSelector } from './base';
import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../..//interfaces/serializable';

export interface StaticSelectorSerialized<T> extends Serialized {
  value: T;
  class: 'StaticSelector';
}

export class StaticSelector<T> extends BaseInputSelector
  implements Serializable<StaticSelectorSerialized<T>> {
  constructor(
    private value: T
  ) { super(); }

  static deserialize<T = any>(obj: StaticSelectorSerialized<T>) {
    return new this<T>(obj.value);
  }

  serialize(): StaticSelectorSerialized<T> {
    return {
      class: 'StaticSelector',
      value: this.value
    };
  }

  apply() {
    return this.value;
  }
}
