// Load in dependencies
var fs = require('fs'),
    exec = require('child_process').exec,
    express = require('express'),
    jade = require('jade');

// Define our app
var app = express(),
    isProduction = process.env.NODE_ENV === 'production';
app.use(express.logger());

// Index route sends information on how to use app
var indexJade = fs.readFileSync(__dirname + '/index.jade', 'utf8'),
    indexHtml = jade.render(indexJade);
app.get('/', function indexRoute (req, res) {
  res.send(indexHtml);
});

// If we are developing, display a screenshot route
if (!isProduction) {
  app.get('/screenshot', function screenshotDevRoute (req, res) {
    var screenshotHtml = fs.readFileSync(__dirname + '/screenshot.html', 'utf8');
    res.send(screenshotHtml);
  });
}

// Badge route sends screenshot of large user badge
// semver'd API bitches.
function badgeRoute (req, res) {
  exec('phantomjs screenshot.js', {cwd: __dirname}, function (err, stdout, stderr) {
    res.send(stdout);
  });
}
app.get('/:username', badgeRoute);
app.get('/1/:username', badgeRoute);
app.get('/1.0/:username', badgeRoute);
app.get('/1.0.0/:username', badgeRoute);

// Begin listening
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Server started at http://127.0.0.1:' + port + '/');
});
