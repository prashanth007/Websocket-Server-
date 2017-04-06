let express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	log = require('./helpers/log').getLogger(__filename);

app.set('x-powered-by', false);
app.set('port', process.env.PORT || 8082);

if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.send('error', {
			message: err.message,
			error: err
		});
	});
}

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send('error', {
		message: err.message,
		error: {}
	});
});

app.get('/', function(req, res) {
	res.status(200);
	res.send('Welcome');
});

app.use(bodyParser.json());
app.use(require('./routers'));

module.exports = app;