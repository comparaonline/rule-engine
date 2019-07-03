import { expect } from 'chai';
import { IncludedIn } from '../included-in';
import { StaticSelector } from '../../selector/input/static';
import { testInput } from '../../test/helpers/test-input';
import { testSerialization } from '../../test/helpers/serialization';
import { conditionDeserializer } from '../deserializer';
import { StaticListSelector } from '../../selector/input/static-list';
import { DynamicInputSelector } from '../../selector/input/dynamic';
import { testDescription } from '../../test/helpers/description';

describe('IncludedIn', () => {
  const condition = new IncludedIn(
    new StaticSelector('test'),
    new StaticListSelector('this, is, a, test')
  );
  it('returns true when the left value is included in the right value', () => {
    expect(condition.apply(testInput)).to.be.true;
  });

  it('returns false when the left value is not included in the right value', () => {
    const condition = new IncludedIn(
      new StaticSelector('test'),
      new StaticListSelector('this, is, another, list')
    );
    expect(condition.apply(testInput)).to.be.false;
  });

  it('correctly matches values starting with 0', () => {
    const condition = new IncludedIn(
      new DynamicInputSelector('data', 'values.numeric'),
      new StaticListSelector('123, 0022200, 456')
    );
    expect(condition.apply(testInput)).to.be.true;
  });

  it('correctly matches number values', () => {
    const condition = new IncludedIn(
      new StaticSelector('12345'),
      new StaticListSelector('12, 123, 1234, 12345, 123456')
    );
    expect(condition.apply(testInput)).to.be.true;
  });

  testSerialization(conditionDeserializer)({
    name: 'included-in',
    deserialized: condition
  });

  testDescription(condition, `"test" is included in the list [this, is, a, test]`);
});
