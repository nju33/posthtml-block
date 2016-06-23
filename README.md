# posthtml-block

[![npm version](https://badge.fury.io/js/posthtml-block.svg)](https://badge.fury.io/js/posthtml-block)
[![Build Status](https://travis-ci.org/totora0155/posthtml-block.svg?branch=master)](https://travis-ci.org/totora0155/posthtml-block)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

<p><img width="20" src="https://camo.githubusercontent.com/4f0f92bada37893db0a761078a6c1b2fb7dfef14/687474703a2f2f706f737468746d6c2e6769746875622e696f2f706f737468746d6c2f6c6f676f2e737667"> <a href="https://github.com/posthtml/posthtml">PostHTML</a> plugin that to create block element (like a component)</p>

## Install
```
npm install posthtml-block
```

## Usage

Create .html file.
```html
<!DOCTYPE html>
<html lang="ja">
<head>
</head>
<body>
  <block block-name="post-footer" class="post-footer__box">
    <span block-text="year"></span>
    <span block-text="month"></span>
    <span block-text="day"></span>
  </block>

  <block block-name="post" block-tag="article" block-attr-class="class" class="post__box">
    <header class="post__header">
      <h1 block-text="title"></h1>
    </header>
    <div class="post__body">
      <img class="blocks__eyecatching" block-attr-src="src" block-attr-alt="alt">
      <div block-content></div>
    </div>
    <post-footer></post-footer>
  </block>

  <post title="title 1" year="1" month="1" day="1" class="post--first"
    src="image.png" alt="block image">
    <p class="post__paragraph">example content 1</p>
  </post>

  <post title="title 2" year="2" month="2" day="2">
    <p class="post__paragraph">example content 2</p>
  </post>
</body>
</html>

```

Transform it.
```javascript
const fs = require('fs');
const posthtml = require('posthtml');
const block = require('posthtml-block');
const pretty = require('pretty');

const html = fs.readFileSync('./sample.html', 'utf-8');

posthtml([block])
  .process(html)
  .then(result => console.log(pretty(result.html)));

```

Output like this.
```html
<!DOCTYPE html>
<html lang="ja">
  <head>
  </head>
  <body>
    <article class="post__box post--first">
      <header class="post__header">
        <h1>title 1</h1>
      </header>
      <div class="post__body">
        <img class="blocks__eyecatching" src="image.png" alt="block image">
        <div>
          <p class="post__paragraph">example content 1</p>
        </div>
      </div>
      <div class="post-footer__box">
        <span>1</span>
        <span>1</span>
        <span>1</span>
      </div>
    </article>
    <article class="post__box">
      <header class="post__header">
        <h1>title 2</h1>
      </header>
      <div class="post__body">
        <img class="blocks__eyecatching" src="" alt="">
        <div>
          <p class="post__paragraph">example content 2</p>
        </div>
      </div>
      <div class="post-footer__box">
        <span>2</span>
        <span>2</span>
        <span>2</span>
      </div>
    </article>
  </body>
</html>

```

## Attributes

#### block-name
Set block name.

#### block-tag
Change tag after transformed. default by `div`.

#### block-text
That element set text. (like `element.innerText`)

#### block-content
That element set html. (like `element.innerHTML`)

#### block-attr-*
That selement set `*`. if not defined `*`, then set `''`

## Run to example

**1** Close this repository

```
git clone git@github.com:totora0155/posthtml-block.git
```

**2** Change current directory
```
cd posthtml-block
```

**3** Install modules
```
npm install
```

**4** Run script
```
cd examples && node posthtml.js
```

## ChangeLog

|version|log|
|:-:|:--|
|1.0.1|Add attr to `block-attr-*`|
|1.0.0|Rewrite with es2015 & Implemented `block-*` attrs|
