import { expect } from 'chai';
import { DynamicInputSelector } from '../dynamic';
import { testInput } from '../../../test/helpers/test-input';
import { testSerialization } from '../../../test/helpers/serialization';
import { inputSelectorDeserializer } from '../deserializer';

const ONE = 1;
const THREE = 3;

describe('DynamicInputSelector', () => {
  it('gets the expected first level property', () => {
    const selector = new DynamicInputSelector('data', 'name');
    expect(selector.apply(testInput)).to.equal('Test Name');
  });

  it('gets the expected nested property', () => {
    const selector = new DynamicInputSelector('data', 'values.string');
    expect(selector.apply(testInput)).to.equal('string');
  });

  it('gets the expected nested array property', () => {
    const selector = new DynamicInputSelector('data', 'values.array[1]');
    expect(selector.apply(testInput)).to.equal(ONE);
  });

  it('gets the expected nested array property using conditions', () => {
    const selector = new DynamicInputSelector('data', 'values.complex[code=third].value');
    expect(selector.apply(testInput)).to.equal(THREE);
  });

  testSerialization(inputSelectorDeserializer)({
    name: 'dynamic-input',
    deserialized: new DynamicInputSelector('data', 'name')
  });
});
