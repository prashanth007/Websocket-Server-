let app = require('./app'),
	server = require('http').createServer(app),
	WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({
		server: server,
		path: '/websocket'
	}),
	port = process.env.PORT || 8082,
	log = require('./helpers/log').getLogger(__filename),
	messageHandler = require('./socketrouters');

wss.on('connection', function(ws) {
	ws.on('message', function(data, flags) {
		log.info('Message : ', data, ' flags : ', flags);
		messageHandler.handleMessage(data);
	});
	ws.on('ping', function(data, flags) {
		log.info('Got ping : ', data, ' flags : ', flags);
	});
	ws.on('pong', function(data, flags) {
		log.info('Got pong : ', data, ' flags : ', flags);
		ws._pendingPongs--;
	});
	ws.on('error', function(error) {
		log.error('Connection error : ', error);
		clearInterval(ws._sendPing);
	});
	ws.on('close', function(code, message) {
		log.info('Connection closed code : ', code, ' message : ', message);
		clearInterval(ws._sendPing);
	});
	ws._id = ws.upgradeReq.headers['sec-websocket-key'];
	ws._pendingPongs = 0;
	ws._sendPing = setInterval(function() {
		if (ws._pendingPongs > 0 && ws.readyState === 1)
			return ws.close();
		ws.ping(ws._id, null, true);
		ws._pendingPongs++;
	}, 60000);
	log.info('Id of socket connection ', ws._id);
});

wss.on('error', function(error) {
	log.error('WebSocketServer Connection error : ', error);
});

module.exports = {
	start: function() {
		server.listen(port, function() {
			log.info('Server started ' + port + ' processId ' + process.pid);
		});
	},
	shutdown: function() {
		wss.clients.forEach(function(ws){
			ws.close(1001, 'server shutdown');
		});
		server.close(function() {
			log.info('Going to shutdown the server');
			process.exit(0);
		});
	},
	forceShutdown: function() {
		log.info('force shutdown');
	}
};