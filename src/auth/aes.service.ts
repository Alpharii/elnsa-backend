import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AesService {
  private readonly keySize = 256;
  private readonly iterations = 1000;

  encrypt(text: string, secretKey: string): string {
    const iv = CryptoJS.lib.WordArray.random(128 / 8).toString(
      CryptoJS.enc.Hex,
    );
    const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(
      CryptoJS.enc.Hex,
    );

    const key = CryptoJS.PBKDF2(secretKey, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations,
    });

    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    return salt + iv + encrypted.toString();
  }

  decrypt(encryptedText: string, secretKey: string): string {
    const salt = encryptedText.substr(0, 32);
    const iv = encryptedText.substr(32, 32);
    const ciphertext = encryptedText.substring(64);

    const key = CryptoJS.PBKDF2(secretKey, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations,
    });

    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
