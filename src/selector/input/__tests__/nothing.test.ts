import { expect } from 'chai';
import { NothingSelector } from '../nothing';
import { testSerialization } from '../../../test/helpers/serialization';
import { inputSelectorDeserializer } from '../deserializer';
import { testDescription } from '../../../test/helpers/description';

describe('NothingSelector', () => {
  const selector = new NothingSelector();
  it('gets the provided property', () => {
    expect(selector.apply()).to.be.null;
  });

  testSerialization(inputSelectorDeserializer)({
    name: 'nothing',
    deserialized: selector
  });

  testDescription(selector, 'nothing');
});
