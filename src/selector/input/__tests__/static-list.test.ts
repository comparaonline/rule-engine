import { expect } from 'chai';
import { testSerialization } from '../../../test/helpers/serialization';
import { inputSelectorDeserializer } from '../deserializer';
import { StaticListSelector } from '../static-list';
import { testDescription } from '../../../test/helpers/description';

describe('StaticListSelector', () => {
  const selector = new StaticListSelector('test, test2 , test3,test4');

  it('gets the provided property', () => {
    const selector = new StaticListSelector('test');
    expect(selector.apply()).to.deep.equal(['test']);
  });

  it('gets a list of properties', () => {
    expect(selector.apply()).to.deep.equal(['test', 'test2', 'test3', 'test4']);
  });

  it('gets a list of properties with spaces', () => {
    const selector = new StaticListSelector(' test , test2 , test3 , test4 ');
    expect(selector.apply()).to.deep.equal(['test', 'test2', 'test3', 'test4']);
  });

  testSerialization(inputSelectorDeserializer)({
    name: 'static-list',
    deserialized: selector
  });

  testDescription(selector, `the list [test, test2, test3, test4]`);
});
