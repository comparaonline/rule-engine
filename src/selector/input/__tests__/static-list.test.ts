import { expect } from 'chai';
import { testSerialization } from '../../../test/helpers/serialization';
import { inputSelectorDeserializer } from '../deserializer';
import { StaticListSelector } from '../static-list';

describe('StaticListSelector', () => {
  it('gets the provided property', () => {
    const selector = new StaticListSelector('test');
    expect(selector.apply()).to.deep.equal(['test']);
  });

  it('gets a list of properties', () => {
    const selector = new StaticListSelector('test, test2 , test3,test4');
    expect(selector.apply()).to.deep.equal(['test', 'test2', 'test3', 'test4']);
  });

  it('gets a list of properties with spaces', () => {
    const selector = new StaticListSelector(' test , test2 , test3 , test4 ');
    expect(selector.apply()).to.deep.equal(['test', 'test2', 'test3', 'test4']);
  });

  testSerialization(inputSelectorDeserializer)({
    name: 'static-list',
    deserialized: new StaticListSelector('test, test2 , test3,test4')
  });
});
