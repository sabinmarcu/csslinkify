/*globals require module*/
(function() {

    "use strict";

    var through = require("through"),
        fs = require("fs");

    var template = fs.readFileSync(__dirname + "/browser.js", "utf-8");

    var cssify = module.exports = function(filename, options) {
        return cssify.configure(options)(filename);
    };

    cssify.configure = function(options) {

            options = options || {};
            if (typeof options.autoinject === "undefined") {
                options.autoinject = true;
            }

            return function(filename) {

                if (!/\.css$/i.test(filename)) {
                    return through();
                }

                return through(
                    function (chunk) {},
                    function () {
                        var _css = fs.readFileSync(filename, "utf-8")
                                .replace(/\\/g, "\\\\")
                                .replace(/\\?"/g, "\\\"")
                                .replace(/\r?\n/g, "\\n")
                                .replace(/url\((\\")?(\.[^\)\?]+)(\?[^\)]*)*(\\")\)/g, "url(\\\"\" + require(\"$2\") + \"\\\")"),
                            _name = filename;

                        if (_name.indexOf("/") >= 0) {
                            _name = _name.substr(_name.lastIndexOf("/") + 1);
                        }

                        if (_name.indexOf(".") >= 0) {
                            _name = _name.substr(0, _name.lastIndexOf("."));
                        }

                        var _compiled = template.replace("<<<<CSS>>>>", _css).replace("<<<<NAME>>>>", _name).replace("<<<<AUTOINJECT>>>>", options.autoinject);

                        this.queue(_compiled);
                        this.queue(null);
                    }
                );

            };
    };

})();
