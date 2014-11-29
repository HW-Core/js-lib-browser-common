/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */
define([
    HW2PATH_JS_LIB + "browser/common/Browser.js",
    HW2PATH_JS_LIB + "common/Uri.js"
], function () {
    var $ = Hw2Core;
    return $.Browser.Uri = $.Class({base: $.Uri, members: [
            {
                attributes: "static",
                name: "instance",
                val: null
            },
            {
                attributes: "static",
                name: "I",
                val: function (make_new) {
                    if (make_new || !this._s.instance) {
                        this._s.instance = new $.Browser.Uri(document.location.href);
                    }

                    return this._s.instance;
                }
            },
            {
                attributes: "static",
                name: "updateParams",
                val: function (params, remove, refresh, search) {
                    if (typeof search === "undefined")
                        search = document.location.search.substr(1);

                    $.Browser.JQ.each(params, function (key, value) {
                        search = this._s.updateParam(search, key, value, remove);
                    });

                    //this will reload the page, it's likely better to store this until finished
                    if (refresh)
                        document.location.search = search;
                    else
                        window.history.pushState("", "", document.location.pathname + "?" + search);
                }
            },
            {
                attributes: "static",
                name: "updateParam",
                val: function (key, value, remove, refresh, search)
                {
                    var tmp = {};
                    tmp[key] = value;
                    this.s.updateParams(tmp, remove, refresh, search);
                }
            },
            {
                attributes: "private static",
                name: "updateParam",
                val: function (search, key, value, remove) {
                    key = encodeURI(key);
                    value = encodeURI(value);

                    var kvp = search.split('&');

                    var i = kvp.length;
                    var x;
                    while (i--)
                    {
                        x = kvp[i].split('=');

                        if (x[0] == key)
                        {
                            x[1] = value;
                            kvp[i] = x.join('=');
                            break;
                        }
                    }

                    if (i < 0) {
                        kvp[kvp.length] = [key, value].join('=');
                    }

                    return kvp.join('&');
                }
            }
        ]}
    );
});