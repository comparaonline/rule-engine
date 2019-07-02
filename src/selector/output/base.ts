import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';
import { Output } from '../../output';

export abstract class BaseOutputSelector implements Serializable<Serialized> {
  static canDeserialize(obj: Serialized): boolean {
    return obj.class === this.name;
  }
  abstract apply(output: Output): any;
  abstract set(output: Output, value: any): Output;
  abstract serialize(): Serialized;
}
