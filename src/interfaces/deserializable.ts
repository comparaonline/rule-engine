import { Serialized } from './serialized';

export interface Deserializable<T> {
  deserialize(obj: Serialized): T;
  canDeserialize(obj: Serialized): boolean;
}
