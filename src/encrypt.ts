import { BSON } from 'bson';
import { Buffer } from 'buffer';
import * as crypto from "crypto";
import { EventEmitter } from "events";

import Paste from "./pastes/paste";
import { randomPassword } from "./util";


export interface IEncryptedPayload {
  data: Buffer;
  key: string;
}

export default class EventCryptor extends EventEmitter {
  public paste: Paste;
  public passwordSize: number;
  private cipher: crypto.Cipher;

  constructor(paste: Paste, passwordSize: number = 32) {
    super();

    this.paste = paste;
    this.passwordSize = passwordSize;
  }

  public run(): void {
    const data = this.paste.serialize();
    const password = randomPassword(this.passwordSize);

    const payload = {
      data: null,
      iterations: 10000,
      salt: crypto.randomBytes(8),
      version: 2,
    };

    const key = crypto.pbkdf2Sync(
      password, payload.salt, payload.iterations, 5, 'sha512'
    );

    let encrypted;

    this.cipher = crypto.createCipher('aes256', key);

    this.cipher.on('readable', () => {
      const part = this.cipher.read();

      if (part) {
        if (encrypted) {
          encrypted = Buffer.concat([encrypted, part]);
        } else {
          encrypted = part;
        }

        // Allocated size of buffer / original buffer size
        this.emit('progress', encrypted.length / data.length);
      }
    });
  

    this.cipher.on('end', () => {
      const bson = new BSON()

      this.emit('complete', {
        data: bson.serialize({
          ...payload,
          data: encrypted,
        }),
        key: password,
      });
    });

    this.cipher.write(data);
    this.cipher.end();
  }
}


