import * as CAES from "crypto-js/aes"
import * as CENC from "crypto-js/enc-utf8"

import BlobParser from "./parsers/blobparser";
import { BlobParserI } from "./parsers/blobparseri";
import Paste from "./pastes/paste"
import { randomPassword } from "./util"

export interface Payload {
  data: string;
  key: string;
}

export function decryptFile(data: string, name: string, key: string): BlobParserI {
  const parser = BlobParser.parse(data, name, key);
  return parser;
}

export function encryptFile(paste: Paste, keysize: number = 32): Payload {
  let result: string = CENC.parse(paste.serialize().toString());

  let password: string = randomPassword(keysize);
  let encrypted: any = CAES.encrypt(result, password);
  result = encrypted.toString();

  return {
    data: result,
    key: password,
  };
}
