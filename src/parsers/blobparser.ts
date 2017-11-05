import { BSON } from 'bson';
import { Buffer } from 'buffer';

import { BlobParserI } from './blobparseri';
import BlobParserV1 from './blobparserv1';
import BlobParserV2 from './blobparserv2';


// Blobs are encrypted binary data stored on S3 for Pasty.
// Format can differ depending on what version of Pasty encrypted
// them. Either it's base64-encoded data or a BSON-encoded blob.
//
// Returns a BlobParser depending on the version. It wraps decryption
// functionality.
export default class BlobParser {
  static parse(data: string, name: string, key: string): BlobParserI {
    let parser: BlobParserI;

    const bson = new BSON();

    try {
      const results = bson.deserialize(data);

      if(results.version === 2) {
        return new BlobParserV2(results, name, key);
      } else {
        throw new Error(`Unknown blob API version: "${results.version}".`);
      }
    } catch (e) {
      return new BlobParserV1(data, name, key);
    }
  }
}
