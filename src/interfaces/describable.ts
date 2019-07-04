import { Description } from './description';

export interface Describable {
  constructor: {
    name: string;
  };
  describe(): Description;
}
