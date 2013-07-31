
# pygments

  python pygmentize(1)

## Installation

    $ npm install visionmedia/node-pygments

## Example

  Language specified:

```js
var highlight = require('pygments');

highlight(str, 'js', function(err, html){

}, options)
```

  Guessing:

```js
var highlight = require('pygments');

highlight(str, function(err, html){

}, options)
```

  To use options, see [pygments options](http://pygments.org/docs/quickstart/#options)

## License

  MIT
