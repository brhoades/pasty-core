import { Buffer } from 'buffer';

import MetaData from './metadata';


interface BSONBinary {
  _bsontype: string;
  buffer: Uint8Array[];
  position: number;
  sub_type: 0;
}

interface FileShape {
  id?: number;
  name: string;
  contents?: string;
  data?: string | BSONBinary;
  meta?: MetaData;
  type?: string;
}

interface FileShapeV3 {
  name: string;
  data: BSONBinary;
  meta: MetaData;
}

interface PasteShape {
  files?: FileShape[];

  type?: string;
  content?: string;
  version?: number;

  name?: string;
  mime?: string;
  data?: string;
}


export {
  BSONBinary,
  FileShape,
  FileShapeV3,
  PasteShape,
  MetaData as MetaDataShape,
};
