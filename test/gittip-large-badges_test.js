// Load in dependencies
var renderBadge = require('../lib/gittip-large-badges.js');

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
      it('consistent with past images', function () {

      });
    });
  });
});
