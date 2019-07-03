import { expect } from 'chai';
import { ExcludedIn } from '../excluded-in';
import { StaticSelector } from '../../selector/input/static';
import { testInput } from '../../test/helpers/test-input';
import { testSerialization } from '../../test/helpers/serialization';
import { conditionDeserializer } from '../deserializer';
import { StaticListSelector } from '../../selector/input/static-list';
import { testDescription } from '../../test/helpers/description';

describe('ExcludedIn', () => {
  const condition = new ExcludedIn(
    new StaticSelector('test'),
    new StaticListSelector('this, is, a, test')
  );
  it('returns false when the left value is included in the right value', () => {
    expect(condition.apply(testInput)).to.be.false;
  });

  it('returns true when the left value is excluded from the right value', () => {
    const condition = new ExcludedIn(
      new StaticSelector('test'),
      new StaticListSelector('this, is, another, list')
    );
    expect(condition.apply(testInput)).to.be.true;
  });

  testSerialization(conditionDeserializer)({
    name: 'excluded-in',
    deserialized: condition
  });
  testDescription(condition, `"test" is not included in the list [this, is, a, test]`);
});
