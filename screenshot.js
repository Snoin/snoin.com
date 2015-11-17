var system = require('system');
var page = require('webpage').create();

page.viewportSize = {
    width: 1920,
    height: 1080
};

page.open(system.env.POWEBSCR_HOMEURL, function(status) {
    this.render(system.env.POWEBSCR_IMGPATH);
    phantom.exit();
});
