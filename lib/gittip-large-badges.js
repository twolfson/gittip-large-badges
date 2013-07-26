// Load in dependencies
var exec = require('child_process').exec,
    express = require('express');

// Define our app
var app = express();
app.use(express.logger());

// Set up route
app.get('/', function (req, res) {
  exec('phantomjs screenshot.js', {cwd: __dirname}, function (err, stdout, stderr) {
    res.send(stdout);
  });
});

// Begin listening
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});