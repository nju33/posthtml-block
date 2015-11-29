const fs                   = require('fs'),
      path                 = require('path'),
      posthtml             = require('posthtml'),
      block                = require('..');

const beforeHtml = fs.readFileSync('example/index.html', 'utf-8'),
      afterHtml  = posthtml()
                   .use(block)
                   .process(beforeHtml, {sync: true})
                   .html;

console.log(afterHtml);
