const yaml = require('js-yaml');
const fs   = require('fs');

var config = {};
config.database = {}
try {
  const cfg = yaml.load(fs.readFileSync('./config/dev.yaml', 'utf8'));
  config.port = cfg.port;
  config.database.host = cfg.database.host;
  config.database.port = cfg.database.port;
  config.database.user = cfg.database.user;
  config.database.password = cfg.database.password;
  config.database.database = cfg.database.database;
} catch (e) {
  console.log(e);
}

module.exports = config;