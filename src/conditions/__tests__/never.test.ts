import { expect } from 'chai';
import { Never } from '../never';
import { testInput } from '../../test/helpers/test-input';
import { testSerialization } from '../../test/helpers/serialization';
import { conditionDeserializer } from '../deserializer';
import { testDescription } from '../../test/helpers/description';

describe('Never', () => {
  const condition = new Never();
  it('returns true', () => {
    expect(condition.apply(testInput)).to.be.false;
  });

  testSerialization(conditionDeserializer)({
    name: 'never',
    deserialized: condition
  });

  testDescription(condition, `never`);
});
