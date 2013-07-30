// Load in dependencies
var exec = require('child_process').exec,
    request = require('request');

// Define a function to render the badge
function renderBadge(params, cb) {
  // Fetch user info from gittip API
  var username = params.username,
      userUrl = 'https://www.gittip.com/' + username + '/public.json';
  request(userUrl, function handleUserInfo (err, res, body) {
    // If there was an error, callback with it
    if (err) { return cb(err); }

    // Otherwise, interpret the body
    var userInfo = {};
    try {
      userInfo = JSON.parse(body);
    } catch (e) {}

    // Fallback the value and callback with our screenshot
    var value = userInfo.receiving || '0.00';
    drawBadge(value, cb);
  });
}

// Lower level fn to draw badge
function drawBadge(value, cb) {
  // Invoke phantomjs to draw a canvas and callback with the dataURL to us
  var cmd = 'phantomjs render/screenshot.js "' + value + '"';
  exec(cmd, {cwd: __dirname}, cb);
}

// Expose drawBadge on renderBadge
renderBadge.drawBadge = drawBadge;

// Export renderBadge
module.exports = renderBadge;