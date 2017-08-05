import File from './file';
import Paste from './paste';

export default class PasteFile extends File {
  constructor(public id: number, public name: string,
              public data: string, public mime: string) {
    super(id, name, data, { mime });
  }
}
