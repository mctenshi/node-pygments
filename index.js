
/**
 * Module dependencies.
 */

var spawn = require('child_process').spawn
  , debug = require('debug')('pygments');

/**
 * Highlight the given code `str` as `lang`
 * and invoke `fn(err, html)`.
 *
 * @param {String} str
 * @param {String} lang
 * @param {Function} fn
 * @param {Object} options - optional
 * @api public
 */

module.exports = function(str, lang, fn, options){
  var args = ['-l', lang, '-f', 'html', '-O', 'encoding=utf8'];
  if (!options) options = {};
  if (!options.linenos) options = true;
  for (var key in options) {
    args[5] += ',' + key + '=' + options[key];
  }
  var buf = '';

  if ('function' == typeof lang) {
    fn = lang;
    args = ['-g', '-f', 'html', '-O', 'encoding=utf8'];
    for (var key in options) {
      args[4] += ',' + key + '=' + options[key];
    }
  }

  debug('highlight %s', lang);
  var proc = spawn('pygmentize', args);
  proc.stdout.setEncoding('utf8');
  proc.stdout.on('data', function(s){ buf += s });
  proc.on('close', function(){ fn(null, buf) });
  proc.stdin.write(str);
  proc.stdin.end();
};
