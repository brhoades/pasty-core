import { Buffer } from 'buffer';
import * as crypto from "crypto";

import PasteParser from './pasteparser';
import { BlobParserI } from './blobparseri';
import BlobDataI from '../blobs/blobdata';
import Paste from '../pastes/paste';


// Latest parser which reads BSON-encoded binary data
// and returns a paste.
export default class BlobParserV2 implements BlobParserI {
  constructor(public data: string | BlobDataI, public name: string, public key: string) {
  }

  // Safe to assume this only supported the v3+ paste storage.
  // These pastes are housed by BlobDataIs. The BSON is parsed and provided
  // at construction.
  decrypt(): Paste {
    if (typeof this.data === 'string') {
      throw Error('Unsupported data type for Blob API V2.');
    }

    const key = crypto.pbkdf2Sync(
      this.key, <any>(this.data.salt.buffer), this.data.iterations, 5, 'sha512'
    );
    const decipher = crypto.createDecipher('aes256', key);
    const decrypted = Buffer.concat(
      [decipher.update(<any>(this.data.data.buffer)), decipher.final()]
    );

    return PasteParser.parse(this.name, this.key, decrypted);
  }
}
