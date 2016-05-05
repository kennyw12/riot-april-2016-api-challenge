var express = require('express');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var path = require('path');
var lolApi = require('./api/lol_api');

// setup route middlewares
var csrfProtection = csrf({ cookie: true })

// create express app
var app = express()

// view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

app.get('', csrfProtection, function(req, res) {
  // pass the csrfToken to the view
  res.render('index', { csrfToken: req.csrfToken(), layout: false })
});

app.get('/api/lol/search/:name', csrfProtection, function(req, res) {
  var name = req.params.name;
  lolApi.summonerIdLookup(name).then((summonerData) => {
    var summonerId = summonerData[name].id;
    lolApi.masteryLookup(summonerId).then((championMasteries) => {
      res.send(championMasteries);
    });
  });
});

app.get('/api/lol/champion/:id', csrfProtection, function(req, res) {
  var id = req.params.id;
  lolApi.championImage(id).then((imageData) => {
    res.send(imageData);
  });
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

app.listen(8000, function() {
  console.log('Server Listening at port 8000');
});
