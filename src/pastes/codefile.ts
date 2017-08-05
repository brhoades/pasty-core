import File from './file';
import Paste from './paste';

export default class CodeFile extends File {
  highlighted: number[] = [];

  constructor(public paste: Paste, public id: number, public name: string,
              public data: string, public type: string) {
    super(paste, id, name, data, {
      mime: 'text/plain',
      highlight: type,
    });
  }
}
