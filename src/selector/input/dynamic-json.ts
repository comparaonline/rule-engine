import { Input } from '../../input';
import { BaseInputSelector } from './base';
import { accessor } from '../../lib/accessor';
import { pathToProperties } from '../../lib/pathToProperties';
import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';
import { notStrictEqual } from 'assert';
import { Description } from '../../interfaces/description';

export interface DynamicListObject {
  key: string;
  value: string;
}

export interface DynamicJsonInputSelectorSerialized extends Serialized {
  from: string;
  path: string;
  class: 'DynamicJsonInputSelector';
}

export class DynamicJsonInputSelector extends BaseInputSelector
  implements Serializable<DynamicJsonInputSelectorSerialized> {

  private path: DynamicListObject[];
  constructor(
    private from: string,
    path: string
  ) {
    super();
    notStrictEqual(from, '');
    notStrictEqual(path, '');
    this.path = <DynamicListObject[]> JSON.parse(path);
    this.path.forEach(list => notStrictEqual(list.key, ''));
    this.path.forEach(list => notStrictEqual(list.value, ''));
  }

  static deserialize(obj: DynamicJsonInputSelectorSerialized) {
    return new this(obj.from, obj.path);
  }

  describe(): Description {
    return {
      text: `the properties [${this.path.map(x => x.key).join(',')}] in the '${this.from}' object`
    };
  }

  apply(input: Input) {
    const object = input.get(this.from);
    return this.path.reduce((curr: {}, obj: DynamicListObject) =>
      ({ ...curr, ...{ [obj.value]: this.getValue(object, obj.key) } }),
                            {});
  }

  serialize(): DynamicJsonInputSelectorSerialized {
    return {
      class: 'DynamicJsonInputSelector',
      from: this.from,
      path: JSON.stringify(this.path)
    };
  }

  private getValue<T extends {}>(object: T, path: string) {
    return pathToProperties(path)
      .map(accessor)
      .reduce((a, b) => b(a), object)
      ;
  }
}
