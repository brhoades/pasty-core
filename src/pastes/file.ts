import { Buffer } from 'buffer';

import MetaData from './metadata';


export default class File {
  constructor(public id: number, public name: string,
              public data: string, public meta: MetaData) {
  }

  // base64 string for forcing a file download.
  base64DownloadString(): string {
    return `data:application/octet-stream;base64,${this.getBase64Data()}`;
  }

  // base64 string for feeding into a browser URL.
  base64ViewString(): string {
    return `data:${this.meta.mime};base64,${this.getBase64Data()}`;
  }

  // return json-serialized file
  serialize() {
    return {
      id: this.id,
      name: this.name,
      data: this.data,
      meta: this.meta,
    };
  }

  rawObject() {
    return {
      id: this.id,
      name: this.name,
      data: Buffer.from(this.data, 'base64'),
      meta: this.meta
    }
  }

  getName(): string {
    if (!this.name) {
      return `file-${this.id}`;
    }

    return this.name;
  }
  
  getBase64Data(): string {
    return this.data;
  }

  static isReadable(mime: string): boolean {
    if (/text\//.test(mime)) {
      return true;
    }

    if (mime == "application/javascript") {
      return true;
    }

    return false;
  }

  // helper method to determine if a file is viewable.
  isReadable(): boolean {
    return File.isReadable(this.meta.mime);
  }
};
