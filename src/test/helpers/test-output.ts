import { Output } from '../../output';

type TestData = typeof import('../data/input.json');
const data: TestData = require('../data/input.json');

export const testOutput = new Output({ data });
