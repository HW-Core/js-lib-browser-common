/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */
define([
    HW2PATH_JS_LIB + "browser/common/Browser.js",
    HW2PATH_JS_LIB + "browser/common/DOMTools.js",
    HW2PATH_JS_LIB + "common/Var.js",
    HW2PATH_JS_LIB + "common/Path.js",
    HW2PATH_JS_KERNEL + "Loader.js"
], function () {
    var $ = Hw2Core;
    return $.Browser.Loader = $.Class({base: Hw2Core.Loader, members: [
            {
                /**
                 * src {String} -> path of resource to load
                 * options {Object}:
                 * callback {Function} -> function to cast as callback
                 * sync {Boolen} -> load in async/sync mode
                 * filetype { String } -> you can define file type manually if needed ( html/js etc)
                 */
                // overwrite Hw2Core.Loader.load
                attributes: ["public", "static"],
                name: "load",
                val: function (src, callback, options) {
                    options = options || {};
                    options.filetype = options.filetype!==undefined ? options.filetype : Hw2Core.Path.extension(src);
                    options.sync = options.sync !== undefined ? options.sync : false;

                    switch (options.filetype) {
                        case "css":
                            this.__s._loadCss(src, callback, options.sync);
                            break;
                        case "js":
                            this._super(src, callback, options.sync);
                            break;
                        case "html" || "htm":
                            $.Browser.JQ.ajaxSetup({async: !options.sync});
                            if ($.Var.isset(function() { return options.selector;})) {
                                $.Browser.JQ(options.selector).load(src,null,callback);
                            } else {
                                $.Browser.JQ.ajax(src).done(callback);
                            }
                            $.Browser.JQ.ajaxSetup({async: true});
                            break;
                        default:
                            console.error("filetype: " + options.filetype + " not supported!")
                            return false;
                    }

                    return true;
                }
            },
            {
                attributes: ["private", "static"],
                name: "_loadCss",
                val: function (path, fn, sync, scope) {
                    var timeOut = 15000;
                    var timeout_id, interval_id;

                    var head = document.getElementsByTagName('head')[0], // reference to document.head for appending/ removing link nodes
                            link = document.createElement('link');           // create the link node
                    link.setAttribute('href', path);
                    link.setAttribute('rel', 'stylesheet');
                    link.setAttribute('type', 'text/css');

                    var sheet, cssRules;
                    // get the correct properties to check for depending on the browser
                    if ('sheet' in link) {
                        sheet = 'sheet';
                        cssRules = 'cssRules';
                    }
                    else {
                        sheet = 'styleSheet';
                        cssRules = 'rules';
                    }

                    head.appendChild(link);

                    function checkLoad () {
                        try {
                            if (link[sheet]) { // SUCCESS! our style sheet has loaded
                                if (timeout_id && interval_id) {
                                    clearInterval(interval_id);                     // clear the counters
                                    clearTimeout(timeout_id);
                                }
                                // insert the link node into the DOM and start loading the style sheet

                                fn.call(scope, link);           // fire the callback with link
                                return true;
                            } else {
                                return false;
                            }
                        } catch (e) {
                            return false;
                        }
                    }

                    function onFailure () {
                        clearInterval(interval_id);            // clear the counters
                        clearTimeout(timeout_id);
                        head.removeChild(link);                // since the style sheet didn't load, remove the link node from the DOM
                        fn.call(scope, false); // fire the callback with success == false
                        link = false;
                    }

                    if (sync) {
                        console.warn("Synchronized load of css files is not supported yet, forced to use async.");
                        /*var start = new Date().getTime();
                         while (true) {
                         if (checkLoad()) {
                         return true;
                         }
                         
                         if ((new Date().getTime() - start) > timeOut) {
                         onFailure();
                         return false;
                         }
                         }*/
                    } //else {

                    timeout_id = setTimeout(function () {       // start counting down till fail
                        onFailure();
                    }, timeOut);                                 // how long to wait before failing

                    interval_id = setInterval(function () {                    // start checking whether the style sheet has successfully loaded
                        checkLoad();
                    }, 10); // how often to check if the stylesheet is loaded

                    return link; // return the link node;
                    //}
                }
            }
        ]
    });
});

