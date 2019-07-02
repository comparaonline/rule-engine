import { Input } from '../../input';
import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';

export abstract class BaseInputSelector implements Serializable<Serialized> {
  static canDeserialize(obj: Serialized): boolean {
    return obj.class === this.name;
  }
  abstract apply(input: Input): any;
  abstract serialize(): Serialized;
}
