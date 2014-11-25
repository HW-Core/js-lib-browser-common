/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */
define([
    HW2PATH_JS_LIB + "browser/common/Browser.js",
], function () {
    var $=Hw2Core;
    return $.Browser.Events = $.Class({members: [
            {
                attributes: "public static",
                name: "onBodyLoad",
                val: function (handler) {
                    if (document.readyState === "complete") { 
                        handler();
                        return;
                    }
                    
                    if (window.addEventListener) {
                      window.addEventListener("load", handler, false);
                    }
                    else if (window.attachEvent) {
                      window.attachEvent("onload", handler);
                    }
                }
            }
        ]}
    );
});