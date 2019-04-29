import * as moment from 'moment';
import { Input } from '../../input';
import { BaseInputSelector } from './base';
import { accessor } from '../../lib/accessor';
import { pathToProperties } from '../../lib/pathToProperties';
import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';

export interface AgeSelectorSerialized extends Serialized {
  from: string;
  path: string;
  class: 'AgeSelector';
}

export class AgeSelector extends BaseInputSelector
  implements Serializable<AgeSelectorSerialized> {
  constructor(
    private from: string,
    private path: string
  ) { super(); }

  static deserialize(obj: AgeSelectorSerialized) {
    return new this(obj.from, obj.path);
  }

  static canDeserialize(obj: Serialized): obj is AgeSelectorSerialized {
    return obj.class === 'AgeSelector';
  }

  apply(input: Input) {
    const object = input.get(this.from);
    return this.getValue(object);
  }

  serialize(): AgeSelectorSerialized {
    return {
      class: 'AgeSelector',
      from: this.from,
      path: this.path
    };
  }

  private getValue<T extends {}>(object: T) {
    const date = pathToProperties(this.path)
      .map(accessor)
      .reduce((a, b) => b(a), object)
      .toString();
    const from = (/^\d{4}$/.test(date)) ? moment(date, 'YYYY') : date;
    return moment().diff(from, 'years');
  }
}
