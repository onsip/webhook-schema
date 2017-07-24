# webhook-schema
## Subscription:
Request:
restapi?WebhookSubscriptionAdd
&version="1.0"
&targetUri="http://www.example.com/webhook"
&contentType="json"

* Note: default to version 1.0

Response (written in JSON for convenience):
{
  "version": "1.0",
  "targetUri": "http://www.example.com/webhook",
  "contentType": "application/json",
  "subscriptionId": "5678abcd"
}


## Proposed packet structure discussion
// Example outgoing HTTP request:
POST /webhook HTTP/1.1
Host: www.example.com
Content-Type: application/json
{
  "id": "1234",
  "streamId": "abcd",
  "subscriptionId": "5678abcd",
  "version": "1.0",
  "type": "call.dialog.answered",
  "payload": {
    "requestUri": "bob@foo.onsip.com",
    "uri": "alice@foo.onsip.com"
  },
  "createdAt": "2017-07-05T20:47:26+00:00"
}


The schema to validate the above request can be found publically at:
  https://www.developer.onsip.com/webhooks/schemas/1.0/call/dialog/answered.json

OR through the API:
  restapi?WebhooksSchemaRead&version=1.0&type=call.dialog.answered

id: uniquely identifies this event
streamId: uniquely identifies the set of events which constitute an
interaction on the OnSIP platform (from our end, the "OnSIP UID" aka OUID)
subscriptionId: uniquely identifies a subscription by the customer to a
set of events. This ID is also unique across versions of the webhook events.
version: api version
type: identifies the type of event, and what to expect in a given payload
payload (optional): data associated with the event notification


## "type" naming convention

The names will be defined hierarchically using the "." operator. This
provides a convenient way to supply a set of filters when subscribing
to a set of events.
  Example filters: call.dialog.\*, \# (everything)
Also, it makes documenting and understanding them easier.

call.dialog.incoming
call.dialog.answered
call.dialog.transferred
call.dialog.failed
call.dialog.end
call.recording.complete
call.recording.uploaded
app.vm.received
app.vm.deleted
app.queue.recording.complete
app.queue.recording.uploaded


## "payload" specification

Each "type" will have to specify a set of fields that are required in
a corresponding "payload." That requirement is set by defining a schema
for each event. A schema for each event type will need to live at a location
accessible to the developer.

We're likely going to want to write human readable web docs that spell
out the fields in each event, but we don't necessarily have to do that.
Developers can figure it out. Also, there are potentially tools to help
automate that.

Not discussed, but of importance:
- TTLs on subscriptions, and different options for how to approach it


## Testing

We do testing in the test/ directory. I strongly recommend that we
institue testing for these schemas, as we won't actually be writing
any production code ourselves against the schemas, they are for
external consumption only. As such, we need a way to validate them.
Also, it's super easy.

 npm test


