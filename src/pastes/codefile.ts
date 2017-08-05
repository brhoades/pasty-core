import { encode } from 'utf8';

import File from './file';
import Paste from './paste';
import MetaData from './metadata';


export default class CodeFile extends File {
  highlighted: number[] = [];

  constructor(public id: number, public name: string,
              public data: string, public type: string) {
    super(id, name, data, {
      mime: 'text/plain',
      highlight: type,
    });
  }

  // although our contents are plain text, base64 them for consistency
  rawObject() {
    return {
      id: this.id,
      name: this.name,
      data: btoa(encode(this.data)),
      meta: this.meta
    }
  }

  static empty(id: number = 0): CodeFile {
    return new CodeFile(id, "", "", "auto");
  }
}
