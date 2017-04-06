let util = require('../helpers/util');

class message {
	constructor(dataJson) {
			let self = this;
			let data = util.convertStringtoObject(dataJson);
			self.recipient = data.recipient || '';
			self.message = data.message || '';
			self.timeStamp = data.timeStamp || '';
			self.messageType = data.messageType || '';
			self.messageId = data.messageId || '';
			self.deviceId = data.deviceId || '';
			self.deviceType = data.deviceType || '';
		}

		get recipient() {
			return this.recipient;
		}

		get message() {
			return this.message;
		}

		get timeStamp() {
			return this.timeStamp;
		}

		get messageType() {
			return this.messageType;
		}

		get messageId() {
			return this.messageId;
		}

		get deviceId() {
			return this.deviceId;
		}

		get deviceType() {
			return this.deviceType;
		}
}