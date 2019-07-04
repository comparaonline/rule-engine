import { Conditional } from './conditional';
import { Serializable } from './interfaces/serializable';
import { Serialized } from './interfaces/serialized';
import { Input } from './input';
import { Output } from './output';
import { Describable } from './interfaces/describable';
import { Description } from './interfaces/description';

export abstract class Rule<S extends Serialized> extends Conditional
  implements Serializable<S>, Describable {
  static deserialize(_: Serialized): Rule<Serialized> {
    throw new Error('Method not implemented');
  }

  static canDeserialize(obj: Serialized): boolean {
    return obj.class === this.name;
  }

  async apply(input: Input, output: Output): Promise<Output> {
    return this.shouldRun(input) ? this.perform(input, output) : output;
  }

  abstract serialize(): S;
  abstract describe(): Description;
  protected abstract perform(input: Input, output: Output): Promise<Output>;
}
