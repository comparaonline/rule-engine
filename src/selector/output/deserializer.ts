import { DynamicOutputSelector } from './dynamic';
import { Deserializer } from '../../deserializer';
import { BaseOutputSelector } from './base';

class OutputSelectorDeserializer extends Deserializer<BaseOutputSelector> {
  protected deserializers = [DynamicOutputSelector];
}
export const outputSelectorDeserializer = new OutputSelectorDeserializer();
