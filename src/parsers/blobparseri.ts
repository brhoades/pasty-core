import { Buffer } from 'buffer';

import BlobDataI from '../blobs/blobdata';
import Paste from '../pastes/paste';

export interface BlobParserI {
  decrypt(): Paste;
  decryptAsync(progress: (p: number) => any, complete: (p: Paste) => any);
};
