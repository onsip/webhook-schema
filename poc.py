#!/usr/bin/env python
import json
import jsonschema

def openJsonFile(path):
  with open(path) as data_file:
    return json.load(data_file)

def testAnswered(baseSchema):
  schema = openJsonFile('./schemas/call/dialog/answered.json')
  event = {
    "id": "1234",
    "streamId": "abcd",
    "subscriptionId": "5678abcd",
    "type": "call.dialog.answered",
    "payload": {
      "requestUri": "bob@foo.onsip.com",
      "uri": "alice@foo.onsip.com"
    },
    "createdAt": "2017-07-05T20:47:26+00:00"
  }

  validatorClass = jsonschema.validators.validator_for(schema)
  validatorClass.check_schema(schema)
  validator = validatorClass(schema)

  # TODO: there ought to be a nicer way to write this wherein
  # the "id" does not need to be pulled manually from the base
  # schema. Likely using RefResolver, but I wasn't able to get
  # it to behave on a first pass.
  validator.resolver.store[baseSchema['id']] = baseSchema
  validator.validate(event)


baseSchema = openJsonFile('./schemas/base.json')
testAnswered(baseSchema)

