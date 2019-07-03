import { Input } from '../../input';
import { BaseInputSelector } from './base';
import { accessor } from '../../lib/accessor';
import { pathToProperties } from '../../lib/pathToProperties';
import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';
import { notStrictEqual } from 'assert';
import { Description } from '../../interfaces/Description';

export interface DynamicInputSelectorSerialized extends Serialized {
  from: string;
  path: string;
  class: 'DynamicInputSelector';
}

export class DynamicInputSelector extends BaseInputSelector
  implements Serializable<DynamicInputSelectorSerialized> {
  constructor(
    private from: string,
    private path: string
  ) {
    super();
    notStrictEqual(from, '');
    notStrictEqual(path, '');
  }

  static deserialize(obj: DynamicInputSelectorSerialized) {
    return new this(obj.from, obj.path);
  }

  describe(): Description {
    return {
      text: `the property '${this.path}' in the '${this.from}' object`
    };
  }

  apply(input: Input) {
    const object = input.get(this.from);
    return this.getValue(object);
  }

  serialize(): DynamicInputSelectorSerialized {
    return {
      class: 'DynamicInputSelector',
      from: this.from,
      path: this.path
    };
  }

  private getValue<T extends {}>(object: T) {
    return pathToProperties(this.path)
      .map(accessor)
      .reduce((a, b) => b(a), object)
      ;
  }
}
