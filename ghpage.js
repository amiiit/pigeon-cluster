const ghpages = require('gh-pages');
const path = require('path');

console.info('Will release an updated version of gh-pages')
ghpages.publish(path.join(__dirname, 'docs'), function (err) {
    if (err) {
        console.error('error', err)
    } else {
        console.info('gh-pages successfully released')
    }
});