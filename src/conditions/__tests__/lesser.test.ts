import { expect } from 'chai';
import { Lesser } from '../lesser';
import { StaticSelector } from '../../selector/input/static';
import { testInput } from '../../test/helpers/test-input';
import { testSerialization } from '../../test/helpers/serialization';
import { conditionDeserializer } from '../deserializer';
import { testDescription } from '../../test/helpers/description';

describe('Lesser', () => {
  const condition = new Lesser(
    new StaticSelector('1'),
    new StaticSelector('2')
  );
  it('returns true when the first value is smaller than the second', () => {
    expect(condition.apply(testInput)).to.be.true;
  });

  it('return false when the first value is greater than the second', () => {
    const condition = new Lesser(
      new StaticSelector('2'),
      new StaticSelector('1')
    );
    expect(condition.apply(testInput)).to.be.false;
  });

  it('return false when the values are equal', () => {
    const condition = new Lesser(
      new StaticSelector('1'),
      new StaticSelector('1')
    );
    expect(condition.apply(testInput)).to.be.false;
  });

  testSerialization(conditionDeserializer)({
    name: 'lesser',
    deserialized: condition
  });

  testDescription(condition, `"1" is lesser than "2"`);
});
