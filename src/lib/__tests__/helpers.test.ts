import { expect } from 'chai';
import { range, tryOrFalse } from '../helpers';

describe('helpers', () => {
  describe('range', () => {
    it('returns a range from 0 to the specified value', () => {
      // tslint:disable-next-line: no-magic-numbers
      const test = range(5);
      // tslint:disable-next-line: no-magic-numbers
      expect(test).to.deep.equal([0, 1, 2, 3, 4]);
    });
  });

  describe('tryOrfalse', () => {
    it('returns the result value if everything is OK', async () => {
      const result = await tryOrFalse(() => true);
      expect(result).to.be.true;
    });
    it('returns false if the function throws', async () => {
      const result = await tryOrFalse(() => { throw new Error(); });
      expect(result).to.be.false;
    });
  });
});
