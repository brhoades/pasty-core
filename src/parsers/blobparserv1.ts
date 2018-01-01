import * as CAES from "crypto-js/aes"
import * as CENC from "crypto-js/enc-utf8"

import PasteParser from './pasteparser';
import { BlobParserI } from './blobparseri';
import BlobDataI from '../blobs/blobdata';
import Paste from '../pastes/paste';


// Deprecated parser which relies on base64-encoded data to
// pass off directly to cryptojs.
export default class BlobParserV1 implements BlobParserI {
  constructor(public data: string | BlobDataI, public name: string, public key: string) {
  }

  // blobv1 only contained JSON data. Safe to stringify.
  // RIP anyone who tries to pass BSON. Good luck.
  decrypt(): Paste {
    const rawWords = CAES.decrypt(this.data, this.key);
    const jsonData = CENC.stringify(rawWords);

    return PasteParser.parse(this.name, this.key, jsonData)
  }

  // Legacy, won't be async.
  decryptAsync(progress: (p: number) => any, complete: (p: Paste) => any) {
    const rawWords = CAES.decrypt(this.data, this.key);
    const jsonData = CENC.stringify(rawWords);

    progress(100);
    complete(PasteParser.parse(this.name, this.key, jsonData));
  }
}
