import { expect } from 'chai';
import { LesserOrEquals } from '../lesser-or-equals';
import { StaticSelector } from '../../selector/input/static';
import { testInput } from '../../test/helpers/test-input';
import { testSerialization } from '../../test/helpers/serialization';
import { conditionDeserializer } from '../deserializer';

describe('LesserOrEquals', () => {
  const condition = new LesserOrEquals(
    new StaticSelector('1'),
    new StaticSelector('2')
  );
  it('returns true when the first value is smaller than the second', () => {
    expect(condition.apply(testInput)).to.be.true;
  });

  it('return false when the first value is greater than the second', () => {
    const condition = new LesserOrEquals(
      new StaticSelector('2'),
      new StaticSelector('1')
    );
    expect(condition.apply(testInput)).to.be.false;
  });

  it('return true when the values are equal', () => {
    const condition = new LesserOrEquals(
      new StaticSelector('1'),
      new StaticSelector('1')
    );
    expect(condition.apply(testInput)).to.be.true;
  });

  testSerialization(conditionDeserializer)({
    name: 'lesser-or-equals',
    deserialized: condition
  });
});
