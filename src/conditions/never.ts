import { BaseCondition } from './base';
import { NothingSelector } from '../selector/input/nothing';
import { Description } from '../interfaces/Description';

export class Never extends BaseCondition {
  constructor() {
    super(new NothingSelector(), new NothingSelector());
  }

  static deserialize() {
    return new Never();
  }

  serialize() {
    return { class: 'Never' };
  }

  describe(): Description {
    return {
      ...this.baseDecription(),
      text: 'never'
    };
  }

  protected test(): boolean {
    return false;
  }
}
