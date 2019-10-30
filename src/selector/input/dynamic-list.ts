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

export interface DynamicListInputSelectorSerialized extends Serialized {
  from: string;
  path: string;
  class: 'DynamicListInputSelector';
}

export class DynamicListInputSelector extends BaseInputSelector
  implements Serializable<DynamicListInputSelectorSerialized> {

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

  static deserialize(obj: DynamicListInputSelectorSerialized) {
    return new this(obj.from, obj.path);
  }

  describe(): Description {
    return {
      text: `the property '${JSON.stringify(this.path)}' in the '${this.from}' object`
    };
  }

  apply(input: Input) {
    const object = input.get(this.from);
    return this.path.reduce((curr: {}, obj: DynamicListObject) =>
    // tslint:disable-next-line: no-parameter-reassignment
    curr = { ...curr, ...{ [obj.value]: this.getValue(object, obj.key) } },
                            {});
  }

  serialize(): DynamicListInputSelectorSerialized {
    return {
      class: 'DynamicListInputSelector',
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
