import { Description } from './interfaces/description';
import { fail } from 'assert';
import { displayList } from './lib/helpers';

const replacers = {
  first: ([first]: string[], tag: string) => (text: string) =>
    text.replace(tag, first),
  second: ([, second]: string[], tag: string) => (text: string) =>
    text.replace(tag, second),
  list: (list: string[], tag: string) => (text: string, level: number) =>
    text.replace(tag, displayList(list, level))
};
export class Describer {
  describe(description: Description, level = 0): string {
    const subparts = (description.includes || []).map(descr => this.describe(descr, level + 1));
    const formatter = this.parse(description.text, subparts);
    return formatter(description.text, level);
  }

  private parse(descriptionText: string, args: string[]) {
    return (text: string, level: number) => [...this.tags(descriptionText)]
      .map(([tag, variable]) => this.getReplacer(variable.trim())(args, tag))
      .reduce((acc, val) => val(acc, level), text);
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
