var fs = require('fs');
var page = require('webpage').create();

(function() {

	page.open('http://ck101.com/thread-3445067-1-1.html', function(status) {
	  console.log("Status: " + status);
	  if(status === "success") {
	  	var docu = page.evaluate(function() {
	  			return document.getElementsByTagName("html")[0].innerHTML;
			});
			fs.write("data.html", docu, 'w');
	  }
	  phantom.exit();
	});
})();