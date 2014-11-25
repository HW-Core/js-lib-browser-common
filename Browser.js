/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */
define([
    HW2PATH_CORE + 'modules/dep/jquery/index.js',
    HW2PATH_JS_LIB + 'browser/common/Loader.js'
], function () {
    var $ = Hw2Core;
    $.Browser = $.Class({});

    // static initialization
    $.Browser.JQ = jQuery.noConflict(true);

    return $.Browser;
});