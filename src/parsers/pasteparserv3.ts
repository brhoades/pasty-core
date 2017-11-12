import { Buffer } from 'buffer';

import PasteParserI from './pasteparseri';
import Paste from '../pastes/paste';
import { PasteShape, FileShapeV3 } from '../pastes/shapes';
import CodeFile from '../pastes/codefile';
import PasteFile from '../pastes/pastefile';


export default class PasteParserV3 implements PasteParserI {
  parse(name: string, key: string, pasteData: PasteShape): Paste {
    const paste: Paste = new Paste(name, key);

    paste.files = pasteData.files.map((f: FileShapeV3, i: number) => {
      if (CodeFile.isReadable(f.meta.mime)) {
        return new CodeFile(
          i, f.name, Buffer.from(f.data.buffer).toString('utf8'),
          f.meta.highlight
        );
      }
      return new PasteFile(
        i, f.name, Buffer.from(f.data.buffer).toString('base64'), f.meta.mime
      );
    });

    return paste;
  }
}
