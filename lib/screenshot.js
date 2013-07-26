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
var __dirname = phantom.libraryPath;
page.open(__dirname + '/screenshot.html?' + username, function (status) {
  // Load in domvas
  page.includeJs(__dirname + '/vendor/domvas.js', function () {
    page.onCallback = function (data) {
      console.log(page.evaluate(function () {
        return window.img;
      }));
      // // Log the page screenshot
      // // TODO: Wait for *all* resources to load
      // console.log(page.renderBase64('png'));

      // Leave
      phantom.exit(0);
    };

    // Get the domvas value of our body
    page.evaluate(function () {
      domvas.toImage(document.querySelector('.gittip-widget'), function () {
        window.img = 'a';
        window.callPhantom();
      });
    });

  });
});

// Set up a timeout to autokill
setTimeout(function () {
  console.error('Timeout occurred at 10 seconds.');
  phantom.exit(1);
}, 1000);