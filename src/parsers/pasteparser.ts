import Paste from '../pastes/paste';
import PasteParserI from './pasteparseri';
import PasteParserV1 from './pasteparserv1';
import PasteParserV2 from './pasteparserv2';
import { PasteShape } from '../pastes/shapes';

export default class PasteParser {
  static parse(name: string, key: string, json: string): Paste {
    const pasteData: PasteShape = JSON.parse(json);
    let parser: PasteParserI;

    // if (pasteData.version == 2) {
    //   TODO
    // }
    if (pasteData.version == undefined) {
      parser = new PasteParserV1();
    } else if (pasteData.version == 2) {
      parser = new PasteParserV2();
    } else {
      throw new Error(`Unknown paste API version: "${pasteData.version}".`);
    }

    return parser.parse(name, key, pasteData);
  }
}
