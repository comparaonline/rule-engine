import { Serialized } from '../interfaces/serialized';
import { Deserializable } from '../interfaces/deserializable';
import { DeserializationError } from './errors/deserialization-error';
import { Serializable } from '../interfaces/serializable';

export abstract class Deserializer<T extends Serializable<Serialized>> {
  protected abstract deserializers: Deserializable<T>[];
  private added: Deserializable<T>[] = [];

  deserialize(obj: Serialized): T {
    const deserializer = this.deserializers
      .concat(this.added)
      .find(deserializer => deserializer.canDeserialize(obj));
    if (!deserializer) {
      throw new DeserializationError(obj);
    }
    return deserializer.deserialize(obj);
  }

  add(deserializable: Deserializable<T>) {
    this.added.push(deserializable);
  }

  clear() {
    this.added = [];
  }
}
