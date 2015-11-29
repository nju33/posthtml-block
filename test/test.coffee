fs           = require 'fs'
path         = require 'path'
chai         = require 'chai'
expect       = chai.expect
posthtml     = require 'posthtml'

block = require '..'

describe 'posthtml-block', ->
  it 'main', ->
    before = fs.readFileSync './test/cases/main/before.html', 'utf-8'
    after = fs.readFileSync './test/cases/main/after.html', 'utf-8'

    html = posthtml()
             .use block
             .process before, {sync: true}
             .html

    expect(html).to.equal(after)
