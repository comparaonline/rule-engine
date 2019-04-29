import { Deserializer } from '../../lib/deserializer';
import { BaseInputSelector } from './base';
import { DynamicInputSelector } from './dynamic';
import { StaticSelector } from './static';
import { NothingSelector } from './nothing';
import { AgeSelector } from './age';
import { StaticListSelector } from './static-list';

class InputSelectorDeserializer extends Deserializer<BaseInputSelector> {
  protected deserializers = [
    DynamicInputSelector,
    StaticSelector,
    NothingSelector,
    AgeSelector,
    StaticListSelector
  ];
}

export const inputSelectorDeserializer = new InputSelectorDeserializer();
