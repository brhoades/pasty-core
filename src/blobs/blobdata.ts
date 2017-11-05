import { Buffer } from 'buffer';


interface BlobDataI {
  data: Buffer;
  salt: Buffer;
  iterations: number;
  version: number;
};

export default BlobDataI;
