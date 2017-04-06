let config = require('../config'),
	redis = require('redis'),
	redisClient = redis.createClient(config.redis_port, config.redis_host);

module.exports = {
	
};