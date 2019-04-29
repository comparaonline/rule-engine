import { Serialized } from './serialized';

export interface Serializable<T extends Serialized> {
  serialize(): T;
}
