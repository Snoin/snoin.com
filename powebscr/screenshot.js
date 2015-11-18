var system = require('system');
var page = require('webpage').create();

// TODO: dynamic viewport support
page.viewportSize = {
    width: 1920,
    height: 1080
};

page.open(system.env.POWEBSCR_HOMEURL, function(status) {
    page.render(system.env.POWEBSCR_IMGPATH);
    phantom.exit();
});
