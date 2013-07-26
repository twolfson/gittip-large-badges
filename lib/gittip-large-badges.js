// Load in dependencies
var fs = require('fs'),
    exec = require('child_process').exec,
    express = require('express'),
    jade = require('jade');

// Define our app
var app = express();
app.use(express.logger());

// Index route sends information on how to use app
var indexJade = fs.readFileSync(__dirname + '/index.jade'),
    indexHtml = jade.render(indexJade);
app.get('/', function (req, res) {
  res.send(indexHtml);
  // exec('phantomjs screenshot.js', {cwd: __dirname}, function (err, stdout, stderr) {
  //   res.send(stdout);
  // });
});

// Begin listening
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Server started at http://127.0.0.1:' + port + '/');
});