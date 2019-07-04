import { expect } from 'chai';
import { StaticSelector } from '../static';
import { testSerialization } from '../../../test/helpers/serialization';
import { inputSelectorDeserializer } from '../deserializer';
import { testDescription } from '../../../test/helpers/description';

describe('StaticSelector', () => {
  const selector = new StaticSelector('test');
  it('gets the provided property', () => {
    expect(selector.apply()).to.equal('test');
  });

  testSerialization(inputSelectorDeserializer)({
    name: 'static',
    deserialized: selector
  });

  testDescription(selector, `"test"`);
});
