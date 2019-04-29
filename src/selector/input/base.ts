import { Input } from '../../input';
import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';

export abstract class BaseInputSelector implements Serializable<Serialized> {
  abstract apply(input: Input): any;
  abstract serialize(): Serialized;
}
