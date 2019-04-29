import * as sinon from 'sinon';
import { fail } from 'assert';

const nullFunc = () => { };
type assignClock = (clock: sinon.SinonFakeTimers) => void;

export const ensure = <T>(value: T | undefined | null) =>
  value !== undefined && value !== null ? value : fail('Unexpected undefined');

export const fakeTimers = (assign: assignClock = nullFunc) => {
  let clock: sinon.SinonFakeTimers;
  beforeEach(() => assign(clock = sinon.useFakeTimers()));
  afterEach(() => clock.restore());
};
