import { Serialized } from './serialized';

export interface Deserializable<T> {
  deserialize(obj: Serialized, ruleId?: number): T;
  canDeserialize(obj: Serialized): boolean;
}
