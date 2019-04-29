import { expect } from 'chai';
import { BaseCondition } from '../base';
import { StaticSelector } from '../../selector/input/static';
import { Input } from '../../input';

describe('BaseCondition', () => {
  class TestCondition extends BaseCondition {
    protected test(left: any, right: any): boolean {
      return left === right;
    }
  }
  const condition = new TestCondition(new StaticSelector(1), new StaticSelector(1));

  it('executes the test method', () => {
    expect(condition.apply(new Input({}))).to.be.true;
  });

  it('converts integers correctly', () => {
    expect(condition.checkType('1')).to.deep.equal(1);
  });

  it('converts float correctly', () => {
// tslint:disable-next-line: no-magic-numbers
    expect(condition.checkType('1.1')).to.deep.equal(1.1);
  });

  it('does not change strings', () => {
    // tslint:disable-next-line: no-magic-numbers
    expect(condition.checkType('test')).to.deep.equal('test');
  });
});
