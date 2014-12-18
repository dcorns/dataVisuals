/**
 * Created by dcorns on 12/15/14.
 */
'use strict';
var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var app = express();

app.use(bodyparser.json());
app.use(express.static(__dirname + (process.env.STATIC_DIR || '/build')));
app.get('/', function(req, res){
  res.status(200);
  res.sendFile(__dirname + '/build/cards.html');
});

var server = http.createServer(app);
server.listen(process.env.PORT || 3000, function () {
  console.log('server running on port 3000');
});