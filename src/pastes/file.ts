import { encode } from 'utf8';

import MetaData from './metadata';


export default class File {
  constructor(public id: number, public name: string , public data: string,
              public meta: MetaData) {
  }

  // base64 string for forcing a file download.
  base64DownloadString(): string {
    return `data:application/octet-stream;base64,${btoa(encode(this.data))}`;
  }

  // return json-serialized file
  serialize(): string {
    return JSON.stringify(this.rawObject());
  }

  rawObject() {
    return {
      id: this.id,
      name: this.name,
      data: this.data,
      meta: this.meta
    }
  }

  getName(): string {
    if (!this.name) {
      return `file-${this.id}`;
    }

    return this.name;
  }
};
