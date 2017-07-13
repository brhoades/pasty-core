define(["require", "exports", "./util", "crypto-js/aes", "crypto-js/enc-utf8"], function (require, exports, util_1, CAES, CENC) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function decryptFile(data, key) {
        var rawWords = CAES.decrypt(data, key);
        return CENC.stringify(rawWords);
    }
    function encryptFile(b64data, keysize) {
        if (keysize === void 0) { keysize = 32; }
        var result = CENC.parse(b64data);
        var password = util_1.randomPassword(keysize);
        var encrypted = CAES.encrypt(result, password);
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
