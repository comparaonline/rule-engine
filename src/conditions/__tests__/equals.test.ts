import { expect } from 'chai';
import { Equals } from '../equals';
import { DynamicInputSelector } from '../../selector/input/dynamic';
import { StaticSelector } from '../../selector/input/static';
import { testInput } from '../../test/helpers/test-input';
import { testSerialization } from '../../test/helpers/serialization';
import { conditionDeserializer } from '../deserializer';

describe('Equals', () => {
  const condition = new Equals(
    new DynamicInputSelector('data', 'name'),
    new StaticSelector('Test Name')
  );
  it('returns true when the two values are equal', () => {
    expect(condition.apply(testInput)).to.be.true;
  });

  it('return false when the two values are different', () => {
    const condition = new Equals(
      new DynamicInputSelector('data', 'name'),
      new StaticSelector('Fake Name')
    );
    expect(condition.apply(testInput)).to.be.false;
  });

  it('correctly matches values starting with 0', () => {
    const condition = new Equals(
      new DynamicInputSelector('data', 'values.numeric'),
      new StaticSelector('0022200')
    );
    expect(condition.apply(testInput)).to.be.true;
  });

  it('correctly matches with boolean values', () => {
    const condition = new Equals(
      new DynamicInputSelector('data', 'values.boolean'),
      new StaticSelector('false')
    );
    expect(condition.apply(testInput)).to.be.true;
  });

  testSerialization(conditionDeserializer)({
    name: 'equals',
    deserialized: condition
  });
});
