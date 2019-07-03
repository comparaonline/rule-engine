import { expect } from 'chai';
import { Deserializer } from '../../deserializer';
import { Serializable } from '../../interfaces/serializable';
import { Serialized } from '../../interfaces/serialized';

export const getSerialized = (name: string) =>
  require(`../data/serialized-${name}.json`);

interface TestParams<T extends { constructor: { name: string } }> {
  deserialized: T;
  name: string;
}

export const testSerialization = <T extends Serializable<Serialized>>
  (Deserializer: Deserializer<T>) => ({ deserialized, name }: TestParams<T>) =>
    describe(`${deserialized.constructor.name} is serializable`, () => {
      const serialized = getSerialized(name);

      it('can be serialized', () => {
        expect(deserialized.serialize()).to.deep.equal(serialized);
      });

      it('can be deserialized', () => {
        expect(Deserializer.deserialize(serialized))
          .to.be.instanceof(deserialized.constructor)
          .and.to.deep.equal(deserialized);
      });
    });
