import { Description } from './interfaces/Description';
import { fail } from 'assert';

interface Formatter {
  (args: string[], tag: string): (text: string) => string;
}

const replacers: { [key: string]: Formatter } = {
  first: ([first]: string[], tag: string) => (text: string) => text.replace(tag, first),
  second: ([, second]: string[], tag: string) => (text: string) => text.replace(tag, second)
};
export class Describer {
  describe(description: Description): string {
    const subparts = (description.includes || []).map(descr => this.describe(descr));
    const formatter = this.parse(description.text, subparts);
    return formatter(description.text);
  }

  private parse(descriptionText: string, args: string[]) {
    return (text: string) => [...this.tags(descriptionText)]
      .map(([tag, variable]) => (this.getReplacer(variable.trim()))(args, tag))
      .reduce((acc, val) => val(acc), text);
  }

  private getReplacer(name: string) {
    return replacers[name] || fail(`{{${name}}} is not a tag`);
  }

  private *tags(text: string) {
    const pattern = /\{\{(.*?)\}\}/gi;
    const clone = new RegExp(pattern.source, pattern.flags);
    let match = null;
    do {
      match = clone.exec(text);
      if (match) yield match;
    } while (match);
  }
}
