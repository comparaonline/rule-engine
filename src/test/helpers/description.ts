import { expect } from 'chai';
import { Describable } from '../../interfaces/describable';
import { Describer } from '../../describer';
export const testDescription = (subject: Describable, expected: string) =>
    describe(`${subject.constructor.name} is describable`, () => {
      const describer = new Describer();

      it('generates the right text', () => {
        expect(describer.describe(subject.describe())).to.eql(expected);
      });
    });
