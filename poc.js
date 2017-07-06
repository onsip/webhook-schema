#!/usr/bin/env node

var Validator = require('jsonschema').Validator;
var baseSchema = require("./schemas/base.json");

function testAnswered() {
  var eventSchema = require("./schemas/call/dialog/answered.json");
  var v = new Validator();

  var instance = {
    "id": "1234",
    "streamId": "abcd",
    "subscriptionId": "5678abcd",
    "type": "call.dialog.answered",
    "payload": {
      "requestUri": "bob@foo.onsip.com",
      "uri": "alice@foo.onsip.com"
    },
    "createdAt": "2017-07-05T20:47:26+00:00"
  };


  v.addSchema(baseSchema);
  console.log(v.validate(instance, eventSchema));
}

function testProduced() {
  var eventSchema = require("./schemas/call/recording/uploaded.json");
  var v = new Validator();

  var instance = {
    "id": "1234",
    "streamId": "abcd",
    "subscriptionId": "5678abcd",
    "type": "call.recording.uploaded",
    "payload": {
      "service": "aws",
      "bucket": "bogus"
    },
    "createdAt": "2017-07-05T20:47:26+00:00"
  };


  v.addSchema(baseSchema);
  console.log(v.validate(instance, eventSchema));
}

testAnswered();
testProduced();
