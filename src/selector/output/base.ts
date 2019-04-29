import { Serialized } from '../../interfaces/serialized';
import { Serializable } from '../../interfaces/serializable';
import { Output } from '../../output';

export abstract class BaseOutputSelector implements Serializable<Serialized> {
  abstract apply(output: Output): any;
  abstract set(output: Output, value: any): Output;
  abstract serialize(): Serialized;
}
