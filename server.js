var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var lolApi = require('./api/lol_api');
var youtubeApi = require('./api/youtube_api');

var app = express()

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'build')));

app.get('', function(req, res) {
  res.render('index', { layout: false })
});

app.get('/api/lol/search/:name', function(req, res) {
  var name = req.params.name;
  lolApi.summonerIdLookup(name).then((summonerData) => {
    var summonerId = summonerData[name].id;
    lolApi.masteryLookup(summonerId).then((championMasteries) => {
      res.send(championMasteries);
    });
  });
});

app.get('/api/lol/champion/:id', function(req, res) {
  var id = req.params.id;
  lolApi.championImageLookup(id).then((imageData) => {
    res.send(imageData);
  });
});

app.get('/api/lol/champion/:id/data/:type', function(req, res) {
  lolApi.championLookup(req.params.id, req.params.type).then((data) => {
    res.send(data);
  })
});

app.get('/api/yt/champion_videos/:id', function(req, res) {
  var id = req.params.id;
  lolApi.championImageLookup(id).then((imageData) => {
    var query = imageData.name;
    youtubeApi.searchYoutube(query).then((videoResults) => {
      Object.assign(videoResults, {query: query})
      res.send(videoResults);
    });
  });
});

app.get('/api/yt/get_videos/:query/token/:token', function(req, res) {
  youtubeApi.searchYoutube(req.params.query, req.params.token).then((videoResults) => {
    Object.assign(videoResults, {query: req.params.query})
    res.send(videoResults);
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
