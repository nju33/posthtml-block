import fs from 'fs';
import test from 'ava';
import posthtml from 'posthtml';
import block from '..';
import pretty from 'pretty';

const html = fs.readFileSync('../examples/sample.html', 'utf-8');
const expect = fs.readFileSync('./expect.html', 'utf-8').trim();

function transform() {
  return new Promise(resolve => {
    posthtml([block])
      .process(html)
      .then(result => resolve(pretty(result.html)));
  });
}

test('block', async t => {
  let html = await transform();
  html = html.split('\n').map(line => {
    return line.replace(/\s*$/, '');
  }).join('\n');
  t.is(html, expect);
});
