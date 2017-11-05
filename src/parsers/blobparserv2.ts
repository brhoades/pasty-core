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
      throw Error('Unsupported data type for v3 blob API.');
    }
    return PasteParser.parse(this.name, this.key, this.data.data);
  }
}
