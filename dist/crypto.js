"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var CAES = require("crypto-js/aes");
var CENC = require("crypto-js/enc-utf8");
function decryptFile(data, key) {
    var rawWords = CAES.decrypt(data, key);
    return CENC.stringify(rawWords);
}
exports.decryptFile = decryptFile;
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
exports.encryptFile = encryptFile;
