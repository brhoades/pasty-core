import PasteParserI from './pasteparseri';
import Paste from '../pastes/paste';
import { PasteShape, FileShape } from '../pastes/shapes';
import CodeFile from '../pastes/codefile';
import PasteFile from '../pastes/pastefile';


export default class PasteParserV1 implements PasteParserI {
  parse(name: string, key: string, pasteData: PasteShape): Paste {
    const paste: Paste = new Paste(name, key);

    if (pasteData.type == "code") {
      paste.files = pasteData.files.map((file: FileShape): CodeFile => {
        return new CodeFile(file.id, file.name, file.contents, file.type);
      });

    } else {
      let file: PasteFile = new PasteFile(0, pasteData.name, pasteData.data,
                                          pasteData.mime);
      paste.files.push(file);
    }

    return paste;
  }
}
