import { BSON } from 'bson';
import { Buffer } from 'buffer';

import File from './file';
import CodeFile from '../pastes/codefile';
import PasteFile from '../pastes/pastefile';


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

  json(): string {
    return JSON.stringify({
      name: this.name,
      key: this.key,
      files: this.files.map(f => f.serialize()),
    });
  }

  static empty(): Paste {
    return new Paste("", "");
  }

  static fromJSON(json: string): Paste {
    const paste: Paste = Paste.empty();
    const data = JSON.parse(json);

    paste.name = data.name;
    paste.key = data.key;

    paste.files = data.files.map((f, i) => {
      if (CodeFile.isReadable(f.meta.mime)) {
        return new CodeFile(
          i, f.name, f.data, f.meta.highlight
        );
      }

      return new PasteFile(
        i, f.name, f.data, f.meta.mime
      );
    });

    return paste;
  }
}
