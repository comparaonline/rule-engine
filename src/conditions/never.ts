import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { NothingSelector } from '../selector/input/nothing';

interface NeverSerialized extends Serialized {
  class: 'Never';
}

export class Never extends BaseCondition {
  constructor() {
    super(new NothingSelector(), new NothingSelector());
  }

  static deserialize() {
    return new Never();
  }
  static canDeserialize(obj: Serialized): obj is NeverSerialized {
    return obj.class === 'Never';
  }

  serialize() {
    return { class: 'Never' };
  }

  protected test(): boolean {
    return false;
  }
}
