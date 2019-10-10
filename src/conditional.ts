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

  protected async shouldRun(input: Input) {
    const result = await Promise
      .all(this.conditions.map(condition => tryOrFalse(() => condition.apply(input))));

    return result.every(value => value);
  }
}
