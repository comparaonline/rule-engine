import { DynamicOutputSelector } from './dynamic';
import { Deserializer } from '../../lib/deserializer';
import { BaseOutputSelector } from './base';

class OutputSelectorDeserializer extends Deserializer<BaseOutputSelector> {
  protected deserializers = [DynamicOutputSelector];
}
export const outputSelectorDeserializer = new OutputSelectorDeserializer();
