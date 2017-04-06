let log = require('../helpers/log').getLogger(__filename);

let env = process.env.NODE_ENV || 'development';
log.info('Env : '+env);
switch (env) {
  case 'development':
    module.exports = require('./development');
    break;
  case 'staging':
    module.exports = require('./staging');
    break;
  case 'production':
    module.exports = require('./production');
    break;
  default:
    log.error("Unrecognized NODE_ENV: " + env);
    process.exit(1);
}