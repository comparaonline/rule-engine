import { expect } from 'chai';
import { Deserializer } from '../deserializer';
import { Serializable } from '../../interfaces/serializable';
import { Serialized } from '../../interfaces/serialized';
import { DeserializationError } from '../errors/deserialization-error';

describe('Deserializer', () => {
  interface TestSerialized extends Serialized {
    value: string;
  }
  class Test implements Serializable<TestSerialized> {
    constructor(
      public value: string
    ) { }

    static deserialize(test: TestSerialized) {
      return new Test(test.value);
    }
    static canDeserialize(obj: Serialized): obj is TestSerialized {
      return obj.class === this.name;
    }

    serialize(): TestSerialized {
      return {
        class: this.constructor.name,
        value: this.value
      };
    }
  }
  class TestDeserializer extends Deserializer<Test> {
    protected deserializers = [Test];
  }

  it('throws an error when the object is not deserializable', () => {
    const deserializer = new TestDeserializer();
    const serialized = { class: 'Unknown' };
    expect(() => deserializer.deserialize(serialized)).to.throw(DeserializationError);
  });

  it('deserializes an object when it is deserializable', () => {
    const deserializer = new TestDeserializer();
    const serialized = new Test('Value').serialize();
    const deserialized = deserializer.deserialize(serialized);
    expect(deserialized).to.be.instanceOf(Test).and.to.have.property('value', 'Value');
  });

  it('allows adding new deserializers', () => {
    const deserializer = new TestDeserializer();
    const serialized = { class: 'Unknown' };
    deserializer.add({
      canDeserialize: () => true,
      deserialize: () => new Test('unknown')
    });
    expect(deserializer.deserialize(serialized)).to.have.property('value', 'unknown');
  });

  it('clears all added deserializers', () => {
    const deserializer = new TestDeserializer();
    const serialized = { class: 'Unknown' };
  /* istanbul ignore next */
    deserializer.add({
      canDeserialize: () => true,
      deserialize: () => new Test('unknown')
    });
    deserializer.clear();
    expect(() => deserializer.deserialize(serialized)).to.throw(DeserializationError);
  });
});
