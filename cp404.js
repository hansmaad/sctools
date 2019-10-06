// Copy index.html to 404.html for github pages.
require('fs').copyFile('./docs/index.html', './docs/404.html', function(err) { err && console.log(err); });
