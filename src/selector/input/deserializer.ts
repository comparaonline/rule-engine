import { Deserializer } from '../../deserializer';
import { BaseInputSelector } from './base';
import { DynamicInputSelector } from './dynamic';
import { StaticSelector } from './static';
import { NothingSelector } from './nothing';
import { AgeSelector } from './age';
import { StaticListSelector } from './static-list';
import { DynamicJsonInputSelector } from './dynamic-json';

class InputSelectorDeserializer extends Deserializer<BaseInputSelector> {
  protected deserializers = [
    DynamicInputSelector,
    DynamicJsonInputSelector,
    StaticSelector,
    NothingSelector,
    AgeSelector,
    StaticListSelector
  ];
}

export const inputSelectorDeserializer = new InputSelectorDeserializer();
