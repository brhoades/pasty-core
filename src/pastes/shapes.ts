import MetaData from './metadata';


interface FileShape {
  id?: number;
  name: string;
  contents?: string;
  data?: string;
  meta?: MetaData;
  type?: string;
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


export { FileShape, PasteShape, MetaData as MetaDataShape };
