import { expect } from 'chai';
import { testInput } from '../../../test/helpers/test-input';
import { testSerialization } from '../../../test/helpers/serialization';
import { AgeSelector } from '../age';
import { fakeTimers } from '../../../test/helpers';
import { inputSelectorDeserializer } from '../deserializer';

describe('AgeSelector', () => {
  let clock: sinon.SinonFakeTimers;
  fakeTimers((c) => { clock = c; });
  const selector = new AgeSelector('data', 'birthdate');

  it('gets the expected age from a birthdate', () => {
    const YEAR_2018 = 2018;
    const SEPTEMBER = 8;
    const NINE = 9;
    const EXPECTED_AGE = 34;
    clock.setSystemTime(new Date(YEAR_2018, SEPTEMBER, NINE));
    expect(selector.apply(testInput)).to.equal(EXPECTED_AGE);
  });

  it('gets the expected age from a year', () => {
    const YEAR_2018 = 2018;
    const JANUARY = 0;
    const SECOND = 2;
    const EXPECTED_AGE = 18;
    const selector = new AgeSelector('data', 'values.year');
    clock.setSystemTime(new Date(YEAR_2018, JANUARY, SECOND));
    expect(selector.apply(testInput)).to.equal(EXPECTED_AGE);
  });

  it('fails when with empty from', () => {
    expect(() => new AgeSelector('', 'test')).to.throw();
  });

  it('fails when with empty paths', () => {
    expect(() => new AgeSelector('data', '')).to.throw();
  });

  testSerialization(inputSelectorDeserializer)({
    name: 'age-selector',
    deserialized: selector
  });
});
