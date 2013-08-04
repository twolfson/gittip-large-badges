// Load in dependencies
var fs = require('fs'),
    assert = require('assert'),
    exec = require('child_process').exec,
    renderBadge = require('../lib/gittip-large-badges.js');

// Set up test folders
var actualDir = __dirname + '/actual_files',
    expectedDir = __dirname + '/expected_files',
    diffDir = __dirname + '/diff_files';

// Guarantee actual files directory
try { fs.mkdirSync(actualDir); } catch (e) {}

// Basic tests
describe('A user', function () {
  before(function () {
    this.username = 'twolfson';
  });

  describe('rendered into a badge', function () {
    before(function (done) {
      // Render the user
      var that = this;
      renderBadge(this.username, function (err, badgeStr) {
        // Save the result
        that.badgeStr = badgeStr;

        // Callback with any errors
        done(err);
      });
    });

    it('generates a base 64 string', function () {
      var badgeStr = this.badgeStr;
      assert(badgeStr);
      assert.strictEqual(typeof badgeStr, 'string');
    });

    describe('saved to an image', function () {
      before(function () {
        // Define the filename for comparison
        var filename = this.username + '.png';
        this.filename = filename;

        // Write the image to the file
        // console.log(this.badgeStr);
        fs.writeFileSync(actualDir + '/' + filename, this.badgeStr, 'base64');
      });

      it('consistent with past images', function (done) {
        // Prepare our command
        var filename = this.filename,
            // cmd = 'imagediff -e ' + expectedDir + '/' + filename + ' ' + expectedDir + '/' + filename;
            cmd = 'phantomjs --version';

        // Run `imagediff` between expected and actual files
        exec(cmd, function (err, stdout) {
          // If there is an error, callback with it
          if (err) { return done(err); }

          // Otherwise, assert stdout was 'true'
          assert.strictEqual(stdout.trim(), 'true');
          done();
        });
      });
    });
  });
});
