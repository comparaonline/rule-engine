import { expect } from 'chai';
import { Describer } from '../describer';

describe('Describer', () => {
  const describer = new Describer();

  it('fails if a tag is not registered', () => {
    expect(() => describer.describe({ text: 'test {{ wtf }} test' }))
      .to.throw('{{wtf}} is not a tag');
  });

  it('replaces values correctly', () => {
    const example = {
      text: '{{first}} and {{second}}',
      includes: [
        { text: '1st' },
        { text: '2nd' }
      ]
    };
    expect(describer.describe(example)).to.equal('1st and 2nd');
  });

  it('supports generating lists', () => {
    const example = {
      text: 'the list:{{list}}',
      includes: [
        { text: '1st' },
        { text: '2nd' }
      ]
    };
    expect(describer.describe(example)).to.equal('the list:\n  - 1st\n  - 2nd');
  });

  it('indents list correctly', () => {
    const example = {
      text: 'the list:{{list}}',
      includes: [
        {
          text: 'sublist:{{list}}',
          includes: [{ text: '1st' }]
        },
        { text: '2nd' }
      ]
    };
    expect(describer.describe(example))
      .to.equal('the list:\n  - sublist:\n    - 1st\n  - 2nd');
  });
});
