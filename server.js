// enable 'strict mode'
'use strict';

// required packages being used
var express = require('express'),
    routes = require('./app/routing/index.js'),
    bodyParser = require('body-parser'), // call 'body-parser' middleware to extract the entire body portion of an incoming request stream and expose it on req.body as something easier to interface with
    app = express();
    

app.use(function(req, res, next) {
    res.header("Acess-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Method", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

routes(app);

app.set('port', (process.env.PORT || 8080)); // define port
app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port')); //log the port in console
}); 

