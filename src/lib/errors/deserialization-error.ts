import { Serialized } from '../../interfaces/serialized';

export class DeserializationError extends Error {
  constructor(obj: Serialized) {
    super(`Can't deserialize ${obj.class}`);
  }
}
