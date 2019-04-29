import { Input } from '../../input';

type TestData = typeof import('../data/input.json');
const data: TestData = require('../data/input.json');

export const testInput = new Input({ data });
