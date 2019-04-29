import cloneDeep = require('clone-deep');

export class Input<T extends {} = any> {
  constructor(
    protected objects: T
  ) { }

  get<K extends keyof T>(name: K): T[K] {
    return cloneDeep(this.objects[name]);
  }
}
