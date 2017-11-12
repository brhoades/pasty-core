import { BSON } from 'bson';
import { Buffer } from 'buffer';

import File from './file';


export default class Paste {
  files: File[] = [];

  constructor(public name: string, public key: string) {
  }

  serialize(): Buffer {
    const bson = new BSON();

    return bson.serialize({
      files: this.files.map(f => f.rawObject()),
      version: 3
    });
  }

  static empty(): Paste {
    return new Paste("", "");
  }
}
