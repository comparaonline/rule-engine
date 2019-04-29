import { Input } from './input';

export class Output<T extends {} = any> extends Input<T> {
  set<K extends keyof T>(name: K, value: T[K]): Output<T> {
    return new Output({
      ...this.objects,
      [name]: value
    });
  }
}
