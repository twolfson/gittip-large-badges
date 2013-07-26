// When an error occurs
function errorFn(msg, trace) {
  // Log the error and trace
  console.error(msg);
  trace.forEach(function(item) {
      console.error('  ', item.file, ':', item.line);
  });

  // Leave with a bad exit code
  phantom.exit(1);
}
phantom.onError = errorFn;

// Load in dependencies
var webpage = require('webpage');

// Create a webpage
var page = webpage.create();
page.onError = errorFn;

// Scrape Google
page.open('http://google.com/', function (status) {
  // Log out the status
  console.log(status);

  // Leave
  phantom.exit(0);
});