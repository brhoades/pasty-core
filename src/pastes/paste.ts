import File from './file';


export default class Paste {
  files: File[] = [];

  constructor(public name: string, public key: string) {
  }

  serialize(): string {
    return JSON.stringify({
      files: this.files.map(f => f.rawObject()),
      version: 2
    });
  }

  static empty(): Paste {
    return new Paste("", "");
  }
};
