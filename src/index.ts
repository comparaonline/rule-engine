import { Rule } from './rule';
import { Input } from './input';
import { Output } from './output';

export class RuleEngine {
  constructor(
    private rules: Rule<any>[]
  ) { }

  async run(input: Input, output: Output) {
    const initialOut = Promise.resolve(output);
    return this.rules
      .reduce(async (out, rule) => rule.apply(input, await out), initialOut);
  }
}
