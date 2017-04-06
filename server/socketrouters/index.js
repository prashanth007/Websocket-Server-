let Message = require('../models/message'),
	log = require('../helpers/log');

module.exports = {
	handleMessage: function(data) {
		let message = new Message(data);
	}
};