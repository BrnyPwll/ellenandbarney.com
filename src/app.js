var compress = require('compression');
var express  = require('express');
var logger   = require('morgan');
var app = express();

var settings = {
  port: process.env.PORT || 5000,
  logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
  staticOptions: {
    extensions: ['html'],
    maxAge: '31556926'
  }
}

app.use(compress());
app.use(logger(settings.logLevel));
app.use('/', express.static('public', settings.staticOptions));

app.listen(settings.port, function () {
  console.log('ellenandbarney.com listening on port ' + settings.port + ' for ' + process.env.NODE_ENV);
});
