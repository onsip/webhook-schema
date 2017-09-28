# webhook-schema
This documentation is best understood by first reading through the developer guide to the OnSIP Webhooks service. Please contact us at [developer@onsip.com](mailto:developer@onsip.com) for the guide (it's currently in the works, and will be available publicly soon).

This repository contains JSON Schemas to which each Webhook event conforms. These schemas are intended for developers to use to validate the data that they receive in the events. If you are unfamiliar with JSON Schema, you can refer to [json-schema.org](json-schema.org).

We also provide coding examples in JavaScript and Python, using their respective JSON Schema libraries.

## Generic Event
Below is the boilerplate for a generic event. It would pass validation on base.json.
```json
{
    "id": "189004747f808d1fd2c4b848480fa270",
    "streamId": "1cd4606b-4c84-45b2-80f8-9318e7aea112",
    "subscriptionId": "300",
    "type": "generic",
    "createdAt": "2017-09-11T21:10:58.735641Z"
}
```
## Understanding `type`
Each webhook event produced by our system contains a `type` field. The types are named hierarchically using the dot operator. This provides a convenient way to supply a set of filters when subscribing to a set of events. The \* matches any word, the \# matches any word or dot. For example:
```
#
call.#
call.dialog.*
```

The types also map directly to the hierarchical folder structure used for storing the schemas associated with the types in this repository. For example, the `call.dialog.confirmed` schema lives at `schemas/call/dialog/confirmed.json`.

Below is the list of all the currently supported types:
* call.dialog.requested
* call.dialog.confirmed
* call.dialog.referred
* call.dialog.terminated
* call.dialog.failed
* call.recording.uploaded

It is important to note that the schema does not care about the content of the values in a JSON object that it is validating, it only cares about the _types_ of the values. Schemas are for validating structure and type. It is up to the user application to parse the `type` field and identify which schema to validate against.

## Events with a `payload`
All events will contain at a minimum the fields specified by the generic event above. Events can optionally include a "payload" field, which is a nested object. The expected fields of the payload are defined in the schema for the corresponding type.

## Testing
To test that a schema works as intended:
```npm test```
