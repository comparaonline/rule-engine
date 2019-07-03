import { BaseCondition } from './base';
import { NothingSelector } from '../selector/input/nothing';
import { Describable } from '../interfaces/describable';
import { Description } from '../interfaces/Description';

export class Always extends BaseCondition implements Describable {
  constructor() {
    super(new NothingSelector(), new NothingSelector());
  }

  static deserialize() {
    return new Always();
  }

  serialize() {
    return { class: 'Always' };
  }

  describe(): Description {
    return {
      ...this.baseDecription(),
      text: 'always'
    };
  }

  protected test(): boolean {
    return true;
  }
}
