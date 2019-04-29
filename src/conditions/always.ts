import { BaseCondition } from './base';
import { Serialized } from '../interfaces/serialized';
import { NothingSelector } from '../selector/input/nothing';

interface AlwaysSerialized extends Serialized {
  class: 'Always';
}

export class Always extends BaseCondition {
  constructor() {
    super(new NothingSelector(), new NothingSelector());
  }

  static deserialize() {
    return new Always();
  }
  static canDeserialize(obj: Serialized): obj is AlwaysSerialized {
    return obj.class === 'Always';
  }

  serialize() {
    return { class: 'Always' };
  }

  protected test(): boolean {
    return true;
  }
}
