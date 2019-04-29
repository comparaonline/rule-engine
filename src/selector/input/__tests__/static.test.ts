import { expect } from 'chai';
import { StaticSelector } from '../static';
import { testSerialization } from '../../../test/helpers/serialization';
import { inputSelectorDeserializer } from '../deserializer';

describe('StaticSelector', () => {
  it('gets the provided property', () => {
    const selector = new StaticSelector('test');
    expect(selector.apply()).to.equal('test');
  });

  testSerialization(inputSelectorDeserializer)({
    name: 'static',
    deserialized: new StaticSelector('test')
  });
});
