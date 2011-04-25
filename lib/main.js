var {Cc, Ci, components} = require("chrome");
var obsSvc = require("observer-service");

exports.main = function() {
    obsSvc.add("http-on-modify-request", cb);
};

var fourchanRE = /^http:\/\/images\.4chan\.org\//;
cb = function(subject, data) {
    var httpChannel = subject.QueryInterface(components.interfaces.nsIHttpChannel);
    var url = subject.URI.spec;
    if (fourchanRE.test(url)) {
        httpChannel.setRequestHeader("Referer", "", false);
    }
};

exports.onUnload = function (reason) {
  obsSvc.remove("http-on-modify-request", cb);
};
