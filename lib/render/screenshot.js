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

// Count the resources as they load
var resourceCount = 0,
    resourceExpected = 4; // index.html, light font, heavy font, heart.git
page.onResourceReceived = function (response) {
  if (response.stage === 'end') {
    resourceCount += 1;
  }
};

// Load the screenshot page
var __dirname = phantom.libraryPath;
page.open(__dirname + '/index.html?' + username, function (status) {
  // Wait until the canvas has rendered
  function checkCanvas() {
    // Determine if the canvas is rendered
    var canvasRendered = page.evaluate(function () {
          return window.canvasRendered;
        });

    // console.log('checking', canvasRendered);
    // If it has not, check again in 100ms
    if (!canvasRendered) {
      return setTimeout(checkCanvas, 100);
    }

    // Grab the canvas contents and echo
    var dataPng = page.evaluate(function () {
          var canvas = document.getElementById('canvas');
          return canvas.toDataURL();
        }),
        // 'data:image/png;base64,iVBORw0KGgoAAAANS...'
        // 'data:image/png;base64,'.length === 22
        png = dataPng.slice(22);
    console.log(png);

    // Leave gracefully
    phantom.exit(0);
  }
  checkCanvas();
});

// Set up a timeout to autokill
setTimeout(function () {
  console.error('Timeout occurred at 2 seconds.');
  phantom.exit(1);
}, 2000);