import { Deserializer } from '../../deserializer';
import { BaseInputSelector } from './base';
import { DynamicInputSelector } from './dynamic';
import { StaticSelector } from './static';
import { NothingSelector } from './nothing';
import { AgeSelector } from './age';
import { StaticListSelector } from './static-list';
import { DynamicListInputSelector } from './dynamic-list';

class InputSelectorDeserializer extends Deserializer<BaseInputSelector> {
  protected deserializers = [
    DynamicInputSelector,
    DynamicListInputSelector,
    StaticSelector,
    NothingSelector,
    AgeSelector,
    StaticListSelector
  ];
}

export const inputSelectorDeserializer = new InputSelectorDeserializer();
