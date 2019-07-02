import { BaseCondition } from './base';
import { NothingSelector } from '../selector/input/nothing';

export class Always extends BaseCondition {
  constructor() {
    super(new NothingSelector(), new NothingSelector());
  }

  static deserialize() {
    return new Always();
  }

  serialize() {
    return { class: 'Always' };
  }

  protected test(): boolean {
    return true;
  }
}
