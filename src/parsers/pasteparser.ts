import { BSON } from 'bson';
import { Buffer } from 'buffer';

import Paste from '../pastes/paste';
import PasteParserI from './pasteparseri';
import PasteParserV1 from './pasteparserv1';
import PasteParserV2 from './pasteparserv2';
import PasteParserV3 from './pasteparserv3';
import { PasteShape } from '../pastes/shapes';

export default class PasteParser {
  static parse(name: string, key: string, data: string | Buffer): Paste {
    let parser: PasteParserI;
    let pasteData: PasteShape;

    if (typeof data === 'string') {
      pasteData = JSON.parse(data);

      if (pasteData.version === undefined) {
        parser = new PasteParserV1();
      } else if (pasteData.version === 2) {
        parser = new PasteParserV2();
      } else {
        throw new Error(`Unknown paste API version: "${pasteData.version}".`);
      }
    } else {
      const bson = new BSON();
      pasteData = bson.deserialize(data);

      if (pasteData.version === 3) {
        parser = new PasteParserV3();
      } else {
        throw new Error(`Unknown paste API version: "${pasteData.version}".`);
      }
    }

    return parser.parse(name, key, pasteData);
  }
}
