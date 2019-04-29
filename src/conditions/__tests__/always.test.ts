import { expect } from 'chai';
import { Always } from '../always';
import { testInput } from '../../test/helpers/test-input';
import { testSerialization } from '../../test/helpers/serialization';
import { conditionDeserializer } from '../deserializer';

describe('Always', () => {
  const condition = new Always();
  it('returns true', () => {
    expect(condition.apply(testInput)).to.be.true;
  });

  testSerialization(conditionDeserializer)({
    name: 'always',
    deserialized: condition
  });
});
