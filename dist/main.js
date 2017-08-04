(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./crypto", "./util", "./pastes/codefile"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var crypto_1 = require("./crypto");
    exports.decryptFile = crypto_1.decryptFile;
    exports.encryptFile = crypto_1.encryptFile;
    var util_1 = require("./util");
    exports.randomPassword = util_1.randomPassword;
    exports.populateDefaults = util_1.populateDefaults;
    var codefile_1 = require("./pastes/codefile");
    exports.CodeFile = codefile_1.default;
});
