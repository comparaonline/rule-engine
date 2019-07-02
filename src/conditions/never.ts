import { BaseCondition } from './base';
import { NothingSelector } from '../selector/input/nothing';

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

  protected test(): boolean {
    return false;
  }
}
