var ModuleTestWMDeflate = (function(global) {

var _runOnNode = "process" in global;
var _runOnWorker = "WorkerLocation" in global;
var _runOnBrowser = "document" in global;


if (!String.fromCodePoint) {
    /*!
    * ES6 Unicode Shims 0.1
    * (c) 2012 Steven Levithan <http://slevithan.com/>
    * MIT License
    */
    String.fromCodePoint = function fromCodePoint () {
        var chars = [], point, offset, units, i;
        for (i = 0; i < arguments.length; ++i) {
            point = arguments[i];
            offset = point - 0x10000;
            units = point > 0xFFFF ? [0xD800 + (offset >> 10), 0xDC00 + (offset & 0x3FF)] : [point];
            chars.push(String.fromCharCode.apply(null, units));
        }
        return chars.join("");
    }
}

return new Test("WMDeflate", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true, // test the primary module and secondary module
    }).add([
        testWMDeflate_test,
    ]).run().clone();



function testWMDeflate_test(test, pass, miss) {

    var original = "";

    for(var i=0x0000; i < 0x5000; i++){
      original += String.fromCodePoint(i);
    }
    var deflated = WMDeflate.deflate(UTF8.fromString(original));
    var result = UTF8.toString(WMDeflate.inflate(deflated));

    if (original === result) {
        test.done(pass());
    }else{
        test.done(miss());
    }

}


})((this || 0).self || global);
