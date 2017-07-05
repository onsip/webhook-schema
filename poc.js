#!/usr/bin/env node

var Validator = require('jsonschema').Validator;

var initialSchema = require("./schemas/1.0/call/dialog/answered.json");
var v = new Validator();
v.addSchema(initialSchema, "");

while (v.unresolvedRefs.length) {
  var nextSchema = v.unresolvedRefs.shift();
  console.log('nextSchema=', nextSchema);
}

process.exit(0);

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


console.log(v.validate(instance, schema));
