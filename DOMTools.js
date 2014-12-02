/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

'use strict';

hw2.define([
    "hw2!PATH_JS_LIB:browser/common/Browser.js"
], function () {
    var $ = this;
    $.Browser.DOMTools = $.Class({base: $.Path, members: [
            {
                attributes: "static",
                name: "redraw",
                val: function () {
                    $.Browser.JQ('body').hide();
                    setTimeout(function () {
                        $.Browser.JQ('body').show();
                    }, 0);
                }
            },
            {
                attributes: "static",
                name: "removeScrollBar",
                val: function (selector) {
                    var text = $.Browser.JQ(selector);
                    text.wrapAll('<div style="overflow:hidden; height:' + text.height() + 'px; width:' + text.width() + 'px" />');
                    text.css("width", text.width() + (text.width() - text[0].scrollWidth));
                }
            },
            {
                attributes: "static",
                name: "centerImage",
                val: function (imgSelector) {
                    var img = $.Browser.JQ(imgSelector);
                    // we need to wait image loading
                    img.load(function () {
                        var parent = img.parent();

                        //get the width of the parent
                        var parent_height = parent.height();

                        //get the width of the image
                        var image_height = img.height();

                        //calculate how far from top the image should be
                        var top_margin = (parent_height - image_height) / 2;

                        //and change the margin-top css attribute of the image
                        img.css('margin-top', top_margin);

                        parent.css('text-align', 'center');
                    });
                }
            },
            {
                name: "removeCss",
                val: function (filename) {
                    $.Browser.JQ("#" + $.String.hashCode(filename)).remove();
                }
            }
        ]}
    );
});