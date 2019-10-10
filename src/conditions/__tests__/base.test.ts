import { expect } from 'chai';
import { BaseCondition } from '../base';
import { StaticSelector } from '../../selector/input/static';
import { Input } from '../../input';
import { testDescription } from '../../test/helpers/description';

describe('BaseCondition', () => {
  class TestCondition extends BaseCondition {

    describe() {
      return {
        text: 'test condition'
      };
    }
    protected test(left: any, right: any): boolean {
      return left === right;
    }
  }
  class TestConditionAsync extends BaseCondition {
    describe() {
      return {
        text: 'test condition Async'
      };
    }
    protected test(left: any, right: any): Promise<boolean> {
      return Promise.resolve(left === right);
    }
  }
  const condition = new TestCondition(new StaticSelector(1), new StaticSelector(1));
  const conditionAsync = new TestConditionAsync(new StaticSelector(1), new StaticSelector(1));

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

  it('executes the Async test method', async () => {
    expect(await conditionAsync.apply(new Input({}))).to.be.true;
  });

  testDescription(condition, `test condition`);
});
