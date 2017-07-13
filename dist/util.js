define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // https://jsfiddle.net/Guffa/DDn6W/
    function randomPassword(length) {
        let chars = "abcdefghijklmnopqrstuvwxyz-_.ABCDEFGHIJKLMNOP1234567890";
        let pass = "";
        for (var x = 0; x < length; x++) {
            let i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    }
    exports.randomPassword = randomPassword;
    // recursively populate missing config entries from default
    function populateDefaults(config, def) {
        let ret = {};
        Object.keys(def).map((key) => {
            if (typeof (def[key]) == 'object') {
                // TODO: if config doesn't have the obj, this'd be bad
                ret[key] = populateDefaults(config[key], def[key]);
            }
            else if (def[key] != undefined) {
                if (config[key] == undefined) {
                    ret[key] = def[key];
                }
                else {
                    ret[key] = config[key];
                }
            }
            else {
                ret[key] = config[key];
            }
        });
        return ret;
    }
    exports.populateDefaults = populateDefaults;
});
