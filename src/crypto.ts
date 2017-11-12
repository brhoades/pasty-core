import { BSON } from 'bson';
import { Buffer } from 'buffer';
import * as crypto from "crypto";


import BlobParser from "./parsers/blobparser";
import { BlobParserI } from "./parsers/blobparseri";
import Paste from "./pastes/paste";
import { randomPassword } from "./util";


export interface Payload {
  data: Buffer;
  key: string;
}

export function decryptFile(data: string, name: string, key: string): BlobParserI {
  return BlobParser.parse(data, name, key);
}

export function encryptFile(paste: Paste, passwordsize: number = 32): Payload {
  const data = paste.serialize();
  const password = randomPassword(passwordsize);

  const payload = {
    data: null,
    iterations: 10000,
    salt: crypto.randomBytes(8),
    version: 2,
  };

  const key = crypto.pbkdf2Sync(
    password, payload.salt, payload.iterations, 5, 'sha512'
  );

  const cipher = crypto.createCipher('aes256', key);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  payload.data = encrypted;
  const bson = new BSON();

  return {
    data: bson.serialize(payload),
    key: password,
  };
}
