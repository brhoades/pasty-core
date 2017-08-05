import File from './file';

export default class PasteFile extends File {
  constructor(public id: number, public name: string , public data: string,
              public mime: string) {
    super(id, name, data, { mime });
  }
}
