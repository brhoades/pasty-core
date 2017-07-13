import { randomPassword } from "./util"
import * as CAES from "crypto-js/aes"
import * as CENC from "crypto-js/enc-utf8"

export function decryptFile(data, key: string): string {
  let rawWords: string = CAES.decrypt(data, key);

  return CENC.stringify(rawWords);
}

export function encryptFile(b64data: string, keysize: number = 32): { data: string, key: string } {
  let result: string = CENC.parse(b64data);

  let password: string = randomPassword(keysize);
  let encrypted: any = CAES.encrypt(result, password);
  result = encrypted.toString();

  return {
    data: result,
    key: password
  };
}
