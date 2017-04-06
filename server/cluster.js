let cluster = require('cluster'),
	cpus = require('os').cpus().length,
	log = require('./helpers/log').getLogger(__filename),
	server = require('./socketserver');

if (cluster.isMaster) {

	for (let i = 0; i < cpus; i++) {
		cluster.fork();
	}

	cluster.on('online', function(worker) {
		log.info('Worker with id ' + worker.id + ' is online');
	});

	cluster.on('exit', function(worker, code, signal) {
		cluster.fork();
		log.info('Worker ' + worker.id + ' died with code: ' + code + ' and signal: ' + signal);
	});

	cluster.on('disconnect', function(worker) {
		log.info('Worker with id ' + worker.id + ' got disconnected');
	});
} else {
	server.start();
	process.on('SIGINT', server.shutdown);
	process.on('SIGTERM', server.shutdown);
}