(function(global) {
"use strict";

// --- dependency modules ----------------------------------
//var Base64 = global["Base64"] || require("uupaa.base64.js");
//var UTF8   = global["UTF8"]   || require("uupaa.utf8.js");

// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function WMDeflate() {
}

//{@dev
WMDeflate["repository"] = "https://github.com/duxca/WMDeflate.js"; // GitHub repository URL. http://git.io/Help
//}@dev

WMDeflate["prototype"] = {
    "constructor":  WMDeflate,           // new WMDeflate():WMDeflate
};


// --- validate / assertions -------------------------------
//{@dev
//function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
//function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = WMDeflate;
}
global["WMDeflate" in global ? "WMDeflate_" : "WMDeflate"] = WMDeflate; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
