import { expect } from 'chai';
import { NotEquals } from '../not-equals';
import { DynamicInputSelector } from '../../selector/input/dynamic';
import { StaticSelector } from '../../selector/input/static';
import { testInput } from '../../test/helpers/test-input';
import { testSerialization } from '../../test/helpers/serialization';
import { conditionDeserializer } from '../deserializer';
import { testDescription } from '../../test/helpers/description';

describe('NotEquals', () => {
  const condition = new NotEquals(
    new DynamicInputSelector('data', 'name'),
    new StaticSelector('Test Name')
  );

  it('returns true when the two values are different', () => {
    const condition = new NotEquals(
      new DynamicInputSelector('data', 'name'),
      new StaticSelector('whatever')
    );
    expect(condition.apply(testInput)).to.be.true;
  });

  it('return false when the two values are equal', () => {
    expect(condition.apply(testInput)).to.be.false;
  });

  testSerialization(conditionDeserializer)({
    name: 'not-equals',
    deserialized: condition
  });

  testDescription(
    condition,
    `the property 'name' in the 'data' object is not equal to "Test Name"`
  );
});
