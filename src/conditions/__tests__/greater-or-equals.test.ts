import { expect } from 'chai';
import { GreaterOrEquals } from '../greater-or-equals';
import { StaticSelector } from '../../selector/input/static';
import { testInput } from '../../test/helpers/test-input';
import { testSerialization } from '../../test/helpers/serialization';
import { conditionDeserializer } from '../deserializer';

describe('GreaterOrEquals', () => {
  const condition = new GreaterOrEquals(
    new StaticSelector('2'),
    new StaticSelector('1')
  );
  it('returns true when the first value is greater than the second', () => {
    expect(condition.apply(testInput)).to.be.true;
  });

  it('return false when the first value is smaller than the second', () => {
    const condition = new GreaterOrEquals(
      new StaticSelector('1'),
      new StaticSelector('2')
    );
    expect(condition.apply(testInput)).to.be.false;
  });

  it('return true when the values are equal', () => {
    const condition = new GreaterOrEquals(
      new StaticSelector('1'),
      new StaticSelector('1')
    );
    expect(condition.apply(testInput)).to.be.true;
  });

  testSerialization(conditionDeserializer)({
    name: 'greater-or-equals',
    deserialized: condition
  });
});
