import File from './file';

export default class CodeFile extends File {
  highlighted: number[] = [];

  constructor(public id: number, public name: string , public data: string,
              public type: string) {
    super(id, name, data, {
      mime: 'text/plain',
      highlight: type,
    });
  }
}
