import { BaseCondition } from './conditions/base';
import { Input } from './input';
import { tryOrFalse } from './lib/helpers';

export abstract class Conditional {
  constructor(
    protected conditions: BaseCondition[]
  ) { }

  protected serializedConditions() {
    return this.conditions.map(condition => condition.serialize());
  }

  protected shouldRun(input: Input) {
    return this.conditions.every(condition => tryOrFalse(() => condition.apply(input)));
  }
}
