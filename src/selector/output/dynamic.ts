import { BaseOutputSelector } from './base';
import { accessor } from '../../lib/accessor';
import { pathToProperties } from '../../lib/pathToProperties';
import { notStrictEqual } from 'assert';
import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';
import { Output } from '../../output';

export interface DynamicOutputSelectorSerialized extends Serialized {
  class: 'DynamicOutputSelector';
  from: string;
  path: string;
}

export class DynamicOutputSelector extends BaseOutputSelector
  implements Serializable<DynamicOutputSelectorSerialized> {
  constructor(
    private from: string,
    private path: string
  ) {
    super();
    notStrictEqual(from, '');
    notStrictEqual(path, '');
  }

  static deserialize(obj: DynamicOutputSelectorSerialized) {
    return new this(obj.from, obj.path);
  }

  static canDeserialize(obj: Serialized): obj is DynamicOutputSelectorSerialized {
    return obj.class === 'DynamicOutputSelector';
  }

  serialize(): DynamicOutputSelectorSerialized {
    return {
      class: 'DynamicOutputSelector',
      from: this.from,
      path: this.path
    };
  }

  apply(output: Output) {
    return pathToProperties(this.path)
      .map(accessor)
      .reduce((a, b) => b(a as any), output.get(this.from));
  }

  set(output: Output, value: any): Output {
    const result = output.get(this.from);
    const properties = pathToProperties(this.path);
    const last = properties.pop() as string;
    const part = properties
      .map(accessor)
      .reduce((a, b) => b(a as any), result);
    part[last] = value;
    return output.set(this.from, result);
  }
}
