import { expect } from 'chai';
import { DynamicJsonInputSelector } from '../dynamic-json';
import { testInput } from '../../../test/helpers/test-input';
import { testSerialization } from '../../../test/helpers/serialization';
import { inputSelectorDeserializer } from '../deserializer';
import { testDescription } from '../../../test/helpers/description';

const ONE = 1;
const THREE = 3;
const path = '[{"key":"name","value":"name"}]';
describe('DynamicListInputSelector', () => {
  const selector = new DynamicJsonInputSelector('data', path);

  it('gets the expected first level property', () => {
    const selector = new DynamicJsonInputSelector('data', '[{"key":"name","value":"name"}]');
    expect(selector.apply(testInput)).to.eql({ name: 'Test Name' });
  });

  it('gets the expected nested property', () => {
    const selector =
      new DynamicJsonInputSelector('data', '[{"key":"values.string","value":"value"}]');
    expect(selector.apply(testInput)).to.eql({ value: 'string' });
  });

  it('gets the expected nested array property', () => {
    const selector =
      new DynamicJsonInputSelector('data', '[{"key":"values.array[1]","value":"values"}]');
    expect(selector.apply(testInput)).to.eql({ values: ONE });
  });

  it('gets the expected nested array property using conditions', () => {
    const selector = new DynamicJsonInputSelector(
        'data', '[{"key":"values.complex[code=third].value","value":"test"}]');
    expect(selector.apply(testInput)).to.eql({ test: THREE });
  });

  it('fails when with empty from', () => {
    expect(() => new DynamicJsonInputSelector('', '[{"key":"test","value":"value"}]')).to.throw();
  });

  it('fails when with empty paths', () => {
    expect(() => new DynamicJsonInputSelector('data', '[{"key":"","value":"value"}]')).to.throw();
  });

  testSerialization(inputSelectorDeserializer)({
    name: 'dynamic-json-input',
    deserialized: selector
  });

  testDescription(selector,
                  `the property '${path}' in the 'data' object`);
});
