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
        testWMDeflate_base64test,
        testWMDeflate_Uint8Arraytest,
    ]).run().clone();



function testWMDeflate_base64test(test, pass, miss) {

    var original = "";

    for(var i=0x000; i < 0x0100; i++){
        var j = String.fromCodePoint(i);
        original += j;
    }

    // String -> base64
    var UTF8OctetString = UTF8.fromString(original);
    var deflatedOctetString = WMDeflate.deflate(UTF8OctetString);
    var hoge = UTF8.fromString(deflatedOctetString)
    if(_runOnNode){
        var Base64String = new Buffer(hoge.toString(), 'binary').toString('base64');//btoa
    }else{
        var Base64String = Base64.btoa(hoge);
    }

    // base64 -> String
    if(_runOnNode){
        var huga = new Buffer(Base64String, 'base64').toString('binary');//atob
    }else{
        var huga = Base64.atob(Base64String);
    }
    var _deflatedOctetString = UTF8.toString(huga);
    var _UTF8OctetString = WMDeflate.inflate(_deflatedOctetString);
    var result = UTF8.toString(_UTF8OctetString);


    if (original === result) {
        test.done(pass());
    }else{
        test.done(miss());
    }
}
function testWMDeflate_Uint8Arraytest(test, pass, miss) {
    // Uint8Array -> Uint8Array
    var original = new Uint8Array(1000);
    for(var i=0; i < 1000; i++){
        original[i] = Math.random()*255|0;
    }
    var OctetString = DataType.Array.toString(original);
    var deflatedOctetString = WMDeflate.deflate(OctetString);
    var deflatedUint8arr = DataType.Array.fromString(deflatedOctetString);

    // Uint8Array -> Uint8Array
    var deflatedOctetString = DataType.Array.toString(deflatedUint8arr);
    var OctetString = WMDeflate.inflate(deflatedOctetString);
    var result = DataType.Array.fromString(OctetString);

    for(var i=0; i < 1000; i++){
        if(original[i] !== result[i]){
            return test.done(miss());
        }
    }
    test.done(pass());


}


})((this || 0).self || global);
