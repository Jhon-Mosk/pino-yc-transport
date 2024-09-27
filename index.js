const { Transform } = require('node:stream');
const build = require('pino-abstract-transport');
const { DEFAULT_LEVELS } = require('pino/lib/constants');

const nums = Object.keys(DEFAULT_LEVELS).reduce((o, k) => {
  o[DEFAULT_LEVELS[k]] = k;
  return o;
}, {});

const getMessage = (obj) => {
  const systemKeys = ['level', 'time', 'pid', 'hostname'];
  const { msg, err } = obj;
  if (err) return err;
  if (msg) return msg;
  const keys = Object.keys(obj).filter((key) => !systemKeys.includes(key));
  if (!keys.length) return '';
  const userObj = keys.reduce((o, key) => {
    return (o[key] = obj[key]), o;
  }, {});
  return JSON.stringify(userObj);
};

/**
 * Create a Pino transport that writes to stdout.
 *
 * The transport expects the source to be a stream of objects with a
 * level property. The level property is expected to have a value that
 * is in DEFAULT_LEVELS from pino/lib/constants. The transport will
 * convert this to an uppercase string and write it to stdout. *
 * @return {Transform} A function that takes a source stream and writes
 * to stdout.
 */
module.exports = function () {
  return build(async function (source) {
    for await (const obj of source) {
      const result = {};
      const level = nums[obj.level] || 'UNSPECIFIED';
      result.level = level.toUpperCase();
      result.message = getMessage(obj);
      process.stdout.write(JSON.stringify(result) + '\n');
    }
  });
};
