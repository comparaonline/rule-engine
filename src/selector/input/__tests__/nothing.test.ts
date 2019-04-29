import { expect } from 'chai';
import { NothingSelector } from '../nothing';
import { testSerialization } from '../../../test/helpers/serialization';
import { inputSelectorDeserializer } from '../deserializer';

describe('NothingSelector', () => {
  it('gets the provided property', () => {
    const selector = new NothingSelector();
    expect(selector.apply()).to.be.null;
  });

  testSerialization(inputSelectorDeserializer)({
    name: 'nothing',
    deserialized: new NothingSelector()
  });
});
