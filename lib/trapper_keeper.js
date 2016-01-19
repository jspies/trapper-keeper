var FileSystem = require('fs'),
    Path       = require('path');

/*
 * constructor(options)
 * configDir and env pass through to initEnvironment
 * suppressErrors will stop throws from happening
 */
var TrapperKeeper = function(options) {
  if (typeof(options) === "undefined") options = {};
  this.options = options;
  this.initEnvironment(options);
  var contentString = loadFile(this.CONFIG_DIR, this.ENV, this.options);
  this.contents = JSON.parse(contentString);

  /* loadFile()
   * Loads the config file from config folder using CONFIG_DIR and ENV
   */
  function loadFile(dir, env, options) {
    var filename = Path.join(dir, env + ".json");

    try {
      contents = FileSystem.readFileSync(filename, 'UTF-8');
    }
    catch (error) {
      if (!options.suppressErrors)
        throw new Error('File ' + filename + ' cannot be read: ' + error.message);
    }

    return contents;
  }

}

/* initEnvironment(options)
 * Sets up the consts for use later on. Can be overridden by options
 * and defaults to sane defaults (development, config, etc);
 * options include:
 * {
 *   env: "development",
 *   config_dir: "./config"
 * }
 */
TrapperKeeper.prototype.initEnvironment = function (options) {
  this.CONFIG_DIR = process.env.NODE_CONFIG_DIR || options.config_dir || process.cwd() + "/config";
  this.ENV = process.env.NODE_ENV || options.env || "development";
};

/* get('db_connection_string')
 * get returns the value from the config file
 */
TrapperKeeper.prototype.get = function (keys) {
  var keyA = keys.split('.');
  var stack = this.contents;
  try {
    for(var i = 0; i< keyA.length; i++) {
      stack = stack[keyA[i]];
    }
    return stack || null;
  } catch(error) {
    return null;
  }
  return stack;
};

exports = module.exports = TrapperKeeper;
