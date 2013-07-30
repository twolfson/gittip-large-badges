// Load in dependencies
var exec = require('child_process').exec;
// Define a function to render the badge
function renderBadge(params, cb) {
  // TODO: Fetch data from gittip API
  var username = params.username;
  exec('phantomjs render/screenshot.js ' + username, {cwd: __dirname}, cb);
}

// Export renderBadge
module.exports = renderBadge;