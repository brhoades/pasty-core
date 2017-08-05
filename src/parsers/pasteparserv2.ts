import { decode } from 'utf8';

import PasteParserI from './pasteparseri';
import Paste from '../pastes/paste';
import { PasteShape, FileShape } from '../pastes/shapes';
import CodeFile from '../pastes/codefile';
import PasteFile from '../pastes/pastefile';


export default class PasteParserV2 implements PasteParserI {
  parse(name: string, key: string, pasteData: PasteShape): Paste {
    const paste: Paste = new Paste(name, key);

    paste.files = pasteData.files.map((f: FileShape, i: number) => {
      if (f.meta.mime == 'text/plain') {
        return new CodeFile(i, f.name, decode(atob(f.data)), f.meta.highlight);
      }
      return new PasteFile(i, f.name, f.data, f.meta.mime);
    });

    return paste;
  }
}
