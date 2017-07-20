var jsonschema = require('jsonschema');
var baseSchema = require("../schemas/base.json");

var v;
var instance;
beforeEach(function() {
  v = new jsonschema.Validator();
  v.addSchema(baseSchema);
  instance = {
    "id": "1234",
    "streamId": "abcd",
    "subscriptionId": "5678abcd",
    "type": "do.not.care",
    "createdAt": "2017-07-05T20:47:26+00:00"
  };
});

describe('call', function() {
  describe('dialog', function() {
    describe('answered', function() {

      var eventSchema;
      beforeEach(function() {
        eventSchema = require("../schemas/call/dialog/answered.json");
        instance["payload"] = {
          "requestUri": "bob@foo.onsip.com",
          "uri": "alice@foo.onsip.com"
        };
      });

      it('schema is a valid schema', function() {
        function emptyValidate() {
          v.validate({}, eventSchema);
        }
        expect(emptyValidate).not.toThrowError(jsonschema.SchemaError);
      });

      it('instance should match schema exactly', function() {
        var result = v.validate(instance, eventSchema);
        expect(result.errors.length).toBe(0);
      });

      it('instance should pass validation, has extra field', function() {
        instance["extra"] = "gravy!";
        var result = v.validate(instance, eventSchema);
        expect(result.errors.length).toBe(0);
      });

      it('instance should pass validation, has extra payload field', function() {
        instance["payload"]["extra"] = "gravy!";
        var result = v.validate(instance, eventSchema);
        expect(result.errors.length).toBe(0);
      });

      [ "id", "streamId", "subscriptionId", "type", "payload", "createdAt"].forEach(function(key) {
        it('instance should fail validation, missing ' + key, function() {
          delete instance[key];
          var result = v.validate(instance, eventSchema);
          expect(result.errors.length > 0).toBeTruthy();
        });
      });

      it('instance should fail validation, missing payload field', function() {
        delete instance["payload"]["uri"];
        var result = v.validate(instance, eventSchema);
        expect(result.errors.length > 0).toBeTruthy();
      });

    });
  });

  describe('recording', function() {
    describe('uploaded', function() {

      var eventSchema;
      beforeEach(function() {
        eventSchema = require("../schemas/call/recording/uploaded.json");
        instance["payload"] = {
          "service": "aws"
        };
      });

      it('schema is a valid schema', function() {
        function emptyValidate() {
          v.validate({}, eventSchema);
        }
        expect(emptyValidate).not.toThrowError(jsonschema.SchemaError);
      });

      it('instance should match schema exactly', function() {
        var result = v.validate(instance, eventSchema);
        expect(result.errors.length).toBe(0);
      });

      it('instance should pass validation, has extra field', function() {
        instance["extra"] = "gravy!";
        var result = v.validate(instance, eventSchema);
        expect(result.errors.length).toBe(0);
      });

      it('instance should pass validation, has extra payload field', function() {
        instance["payload"]["extra"] = "gravy!";
        var result = v.validate(instance, eventSchema);
        expect(result.errors.length).toBe(0);
      });

      [ "id", "streamId", "subscriptionId", "type", "payload", "createdAt"].forEach(function(key) {
        it('instance should fail validation, missing ' + key, function() {
          delete instance[key];
          var result = v.validate(instance, eventSchema);
          expect(result.errors.length > 0).toBeTruthy();
        });
      });

      it('instance should fail validation, missing payload field', function() {
        delete instance["payload"]["service"];
        var result = v.validate(instance, eventSchema);
        expect(result.errors.length > 0).toBeTruthy();
      });

    });
  });

});
