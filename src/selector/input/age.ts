import * as moment from 'moment';
import { Input } from '../../input';
import { BaseInputSelector } from './base';
import { accessor } from '../../lib/accessor';
import { pathToProperties } from '../../lib/pathToProperties';
import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';
import { notStrictEqual } from 'assert';
import { Description } from '../../interfaces/description';

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
  ) {
    super();
    notStrictEqual(from, '');
    notStrictEqual(path, '');
  }

  static deserialize(obj: AgeSelectorSerialized) {
    return new this(obj.from, obj.path);
  }

  describe(): Description {
    return {
      text: `the age of the property '${this.path}' in the '${this.from}' object`
    };
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
