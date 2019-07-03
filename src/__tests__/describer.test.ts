import { expect } from 'chai';
import { Describer } from '../describer';

describe('Describer', () => {
  it('fails if a tag is not registered', () => {
    const describer = new Describer();
    expect(() => describer.describe({ text: 'test {{ wtf }} test' }))
      .to.throw('{{wtf}} is not a tag');
  });

  it('replaces values correctly', () => {
    const describer = new Describer();
    const example = {
      text: '{{first}} and {{second}}',
      includes: [
        { text: '1st' },
        { text: '2nd' }
      ]
    };
    expect(describer.describe(example)).to.equal('1st and 2nd');
  });
});
