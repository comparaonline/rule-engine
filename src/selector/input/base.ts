import { Input } from '../../input';
import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';
import { Describable } from '../../interfaces/describable';
import { Description } from '../../interfaces/Description';

export abstract class BaseInputSelector implements Serializable<Serialized>, Describable {
  static canDeserialize(obj: Serialized): boolean {
    return obj.class === this.name;
  }
  abstract apply(input: Input): any;
  abstract serialize(): Serialized;
  abstract describe(): Description;
}
