var exec = require('child_process').exec;
var express = require('express');
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  exec('phantomjs phantom.js', function (err, stdout, stderr) {
    response.send(stdout);
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});