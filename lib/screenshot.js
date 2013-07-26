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
var system = require('system'),
    webpage = require('webpage');

// Create a webpage
var page = webpage.create();
page.onError = errorFn;

// Grab the arguments
var args = system.args,
    username = args[1];

// If there is no image, throw an error
if (!username) {
  throw new Error('No username was specified.');
}

// Load the screenshot page
page.open(phantom.libraryPath + '/screenshot.html?' + username, function (status) {
  // Log the page screenshot
  // TODO: Wait for *all* resources to load
  console.log(page.renderBase64('png'));

  // Leave
  phantom.exit(0);
});

// Set up a timeout to autokill
setTimeout(function () {
  console.error('Timeout occurred at 10 seconds.');
  phantom.exit(1);
}, 10000);