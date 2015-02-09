'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1', accessKeyId: 'foo', secretAccessKey: 'bar'});
var db = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });
var port = process.env.PORT || 8888;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(bodyParser())
  .get('/', function(req, res) {
    res.sendFile(__dirname + '/out/public/index.html');
  })
  .use(express.static(__dirname + '/out/public'))
  .post('/createTable', function(req, res) {
      db.createTable(req.body, function(err, data) {
        console.log(req.body);
        if (err) {
          console.log(err); // an error occurred
        } 
        else {
          console.log(data); // successful response
          res.send(data);
        }
      });
  })
  .post('/createUser', function(req, res) {
    db.putItem(req.body, function(err, data) {
      console.log(req.body);
      if (err) {
        console.log(err); // an error occurred
      } 
      else {
        console.log(data); // successful response
        res.send(data);
      }
    });
  })
  .post('/getTable', function(req, res) {
    db.scan(req.body, function(err, data) {
      console.log(req.body);
      if (err) {
        console.log(err); // an error occurred
      } 
      else {
        console.log(data); // successful response
        res.send(data);
      }
    });
  })
