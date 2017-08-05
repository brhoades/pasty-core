import { Buffer } from 'buffer';

import File from './file';
import Paste from './paste';
import MetaData from './metadata';


export default class CodeFile extends File {
  highlighted: number[] = [];

  constructor(public id: number, public name: string,
              public data: string, public type: string,
              public mime: string = "text/plain") {
    super(id, name, data, {
      mime,
      highlight: type,
    });
  }

  // although our contents are plain text, base64 them for consistency
  rawObject() {
    return {
      id: this.id,
      name: this.name,
      data: this.getBase64Data(),
      meta: this.meta
    }
  }

  getBase64Data(): string {
    return Buffer.from(this.data).toString('base64');
  }

  static empty(id: number = 0): CodeFile {
    return new CodeFile(id, "", "", "auto");
  }
}
