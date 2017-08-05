import File from './file';
import Paste from './paste';

export default class CodeFile extends File {
  highlighted: number[] = [];

  constructor(public id: number, public name: string,
              public data: string, public type: string) {
    super(id, name, data, {
      mime: 'text/plain',
      highlight: type,
    });
  }

  static empty(id: number = 0): CodeFile {
    return new CodeFile(id, "", "", "auto");
  }
}
