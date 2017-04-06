let log = require('log4js'),
    path = require('path');
log.configure({
    appenders: [{
        type: 'console'
    }
    // , {
    //     type: 'dateFile',
    //     absolute: true,
    //     filename: path.join(__dirname, "../../Log/", "log_file.log"),
    //     pattern: ".yyyy-MM-dd",
    //     alwaysIncludePattern: false,
    //     backups: 10,
    // }
    ]
});
module.exports = {
    getLogger: function(filepath) {
        try {
            return log.getLogger(path.basename(filepath));
        } catch (e) {
            return log.getLogger();
        }   
    } 
};