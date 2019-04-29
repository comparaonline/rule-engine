import { expect } from 'chai';
import { Greater } from '../greater';
import { StaticSelector } from '../../selector/input/static';
import { testInput } from '../../test/helpers/test-input';
import { testSerialization } from '../../test/helpers/serialization';
import { conditionDeserializer } from '../deserializer';

describe('Greater', () => {
  const condition = new Greater(
    new StaticSelector('2'),
    new StaticSelector('1')
  );
  it('returns true when the first value is greater than the second', () => {
    expect(condition.apply(testInput)).to.be.true;
  });

  it('return false when the first value is smaller than the second', () => {
    const condition = new Greater(
      new StaticSelector('1'),
      new StaticSelector('2')
    );
    expect(condition.apply(testInput)).to.be.false;
  });

  it('return false when the values are equal', () => {
    const condition = new Greater(
      new StaticSelector('1'),
      new StaticSelector('1')
    );
    expect(condition.apply(testInput)).to.be.false;
  });

  testSerialization(conditionDeserializer)({
    name: 'greater',
    deserialized: condition
  });
});
