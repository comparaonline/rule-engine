import { expect } from 'chai';
import { DynamicInputSelector } from '../dynamic';
import { testInput } from '../../../test/helpers/test-input';
import { testSerialization } from '../../../test/helpers/serialization';
import { inputSelectorDeserializer } from '../deserializer';
import { testDescription } from '../../../test/helpers/description';

const ONE = 1;
const THREE = 3;

describe('DynamicInputSelector', () => {
  const selector = new DynamicInputSelector('data', 'name');

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

  it('fails when with empty from', () => {
    expect(() => new DynamicInputSelector('', 'test')).to.throw();
  });

  it('fails when with empty paths', () => {
    expect(() => new DynamicInputSelector('data', '')).to.throw();
  });

  testSerialization(inputSelectorDeserializer)({
    name: 'dynamic-input',
    deserialized: selector
  });

  testDescription(selector, `the property 'name' in the 'data' object`);
});
