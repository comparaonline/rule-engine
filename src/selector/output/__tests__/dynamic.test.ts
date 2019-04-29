import { expect } from 'chai';
import { DynamicOutputSelector } from '../dynamic';
import { testSerialization } from '../../../test/helpers/serialization';
import { outputSelectorDeserializer } from '../deserializer';
import { testOutput } from '../../../test/helpers/test-output';

describe('DynamicOutputSelector', () => {
  it('returns a value from the specified output', () => {
    const selector = new DynamicOutputSelector('data', 'name');
    const data = selector.apply(testOutput);
    expect(data).to.equal('Test Name');
  });

  it('returns a new output with the changed params', () => {
    const selector = new DynamicOutputSelector('data', 'name');
    const output = selector.set(testOutput, 'New Name');
    const data = output.get('data');
    expect(data).to.have.ownProperty('name', 'New Name');
  });

  it('changes values using conditions', () => {
    const selector = new DynamicOutputSelector('data', 'values.complex[code=second].value');
    const output = selector.set(testOutput, 'some value');
    const data = output.get('data');
    expect(data).to.have.nested.property('values.complex[1].value', 'some value');
  });

  testSerialization(outputSelectorDeserializer)({
    name: 'dynamic-output',
    deserialized: new DynamicOutputSelector('data', 'values.string')
  });
});
