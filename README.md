# posthtml-block

[PostHTML](https://github.com/posthtml/posthtml) plugin that create component block element

## Install
```
npm install posthtml-block

# if still
npm install posthtml

```

## Usage

Create .html file. (e.g. index.html)
```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <block name="list">
    <ul>
      <li>item</li>
      <li>item</li>
      <li>
        <child-list></child-list>
      </li>
    </ul>
  </block>
  <block name="child-list">
    <ol>
      <li>child-item</li>
      <li>child-item</li>
      <li>child-item</li>
    </ol>
  </block>

  <list></list>

  <entry></entry>

  <block name="entry">
    <main>
      <header>header</header>
      <article>article</article>
      <footer>footer</footer>
    </main>
  </block>
</body>
</html>

```

Transform it, Use the this plugin and **PostHTML** (e.g. posthtml.js)
```javascript
const fs                   = require('fs'),
      posthtml             = require('posthtml'),
      collectInlineStyles  = require('posthtml-block');

const beforeHtml = fs.readFileSync('./index.html', 'utf-8'),
      afterHtml  = posthtml()
                     .use(block)
                     .process(beforeHtml, {sync: true})
                     .html;

console.log(afterHtml);

```

Output will be
```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>



  <ul>
      <li>item</li>
      <li>item</li>
      <li>
        <ol>
      <li>child-item</li>
      <li>child-item</li>
      <li>child-item</li>
    </ol>
      </li>
    </ul>

  <main>
      <header>header</header>
      <article>article</article>
      <footer>footer</footer>
    </main>


</body>
</html>

```

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
npm run example
```
