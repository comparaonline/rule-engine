import { Conditional } from './conditional';
import { Serializable } from './interfaces/serializable';
import { Serialized } from './interfaces/serialized';
import { Input } from './input';
import { Output } from './output';

export abstract class Rule<S extends Serialized> extends Conditional implements Serializable<S> {
  static deserialize<S extends Serialized>(_: S) {
    throw new Error('Method not implemented');
  }

  static canDeserialize<S extends Serialized>(obj: Serialized): obj is S {
    return obj.class === this.name;
  }

  async apply(input: Input, output: Output): Promise<Output> {
    return this.shouldRun(input) ? this.perform(input, output) : output;
  }

  abstract serialize(): S;
  protected abstract perform(input: Input, output: Output): Promise<Output>;
}
