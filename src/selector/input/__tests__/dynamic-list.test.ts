import { expect } from 'chai';
import { DynamicListInputSelector } from '../dynamic-list';
import { testInput } from '../../../test/helpers/test-input';
import { testSerialization } from '../../../test/helpers/serialization';
import { inputSelectorDeserializer } from '../deserializer';
import { testDescription } from '../../../test/helpers/description';

const ONE = 1;
const THREE = 3;
const path = '[{"key":"name","value":"name"}]';
describe('DynamicListInputSelector', () => {
  const selector = new DynamicListInputSelector('data', path);

  it('gets the expected first level property', () => {
    const selector = new DynamicListInputSelector('data', '[{"key":"name","value":"name"}]');
    expect(selector.apply(testInput)).to.eql({ name: 'Test Name' });
  });

  it('gets the expected nested property', () => {
    const selector =
      new DynamicListInputSelector('data', '[{"key":"values.string","value":"value"}]');
    expect(selector.apply(testInput)).to.eql({ value: 'string' });
  });

  it('gets the expected nested array property', () => {
    const selector =
      new DynamicListInputSelector('data', '[{"key":"values.array[1]","value":"values"}]');
    expect(selector.apply(testInput)).to.eql({ values: ONE });
  });

  it('gets the expected nested array property using conditions', () => {
    const selector = new DynamicListInputSelector(
        'data', '[{"key":"values.complex[code=third].value","value":"test"}]');
    expect(selector.apply(testInput)).to.eql({ test: THREE });
  });

  it('fails when with empty from', () => {
    expect(() => new DynamicListInputSelector('', '[{"key":"test","value":"value"}]')).to.throw();
  });

  it('fails when with empty paths', () => {
    expect(() => new DynamicListInputSelector('data', '[{"key":"","value":"value"}]')).to.throw();
  });

  testSerialization(inputSelectorDeserializer)({
    name: 'dynamic-list-input',
    deserialized: selector
  });

  testDescription(selector,
                  `the property '${path}' in the 'data' object`);
});
