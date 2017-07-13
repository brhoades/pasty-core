define(["require", "exports", "./util", "crypto-js/aes", "crypto-js/enc-utf8"], function (require, exports, util_1, CAES, CENC) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function decryptFile(data, key) {
        let rawWords = CAES.decrypt(data, key);
        return CENC.stringify(rawWords);
    }
    function encryptFile(b64data, keysize = 32) {
        let result = CENC.parse(b64data);
        let password = util_1.randomPassword(keysize);
        let encrypted = CAES.encrypt(result, password);
        result = encrypted.toString();
        return {
            data: result,
            key: password
        };
    }
    exports.crypto = {
        decryptFile: decryptFile,
        encryptFile: encryptFile
    };
});
