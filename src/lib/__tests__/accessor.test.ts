import { expect } from 'chai';
import { accessor } from '../accessor';
const input = require('../../test/data/input.json');

describe('accessor', () => {
  it('returns a valid object accessor', () => {
    const testAccessor = accessor('name');
    expect(testAccessor(input)).to.equal('Test Name');
  });

  it('throws if the accessor is not valid', () => {
    const testAccessor = accessor('/');
    expect(() => testAccessor(input)).to.throw();
  });

  it('returns undefined for undefined objects', () => {
    const testAccessor = accessor('value');
    expect(testAccessor(undefined as any)).to.be.undefined;
  });

  it('searches arrays using conditions', () => {
    const THREE = 3;
    const testAccessor = accessor('code=third');
    expect(testAccessor(input.values.complex)).to.have.property('value', THREE);
  });

  it('return undefined when accessing arrays using conditions that dont match', () => {
    const testAccessor = accessor('code=whatever');
    expect(testAccessor(input.values.complex)).to.be.undefined;
  });

  it('returns undefined when having invalid left args', () => {
    const testAccessor = accessor('some.test=whatever');
    expect(testAccessor([0, 1] as any)).to.be.undefined;
  });

  it('returns undefined when the array is empty', () => {
    const testAccessor = accessor('val=whatever');
    expect(testAccessor([] as any)).to.be.undefined;
  });
});
