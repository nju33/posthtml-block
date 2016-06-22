const fs = require('fs');
const posthtml = require('posthtml');
const block = require('..');
const pretty = require('pretty');

const html = fs.readFileSync('./sample.html', 'utf-8');

posthtml([block])
  .process(html)
  .then(result => console.log(pretty(result.html)));
