// Q: What is a JSON Schema?
// https://spacetelescope.github.io/understanding-json-schema/

// My reading has led me to believe that new event packet types
// come out with new versions (albeit not too often).
// We can define the spec such that it's flexible, ie allows
// properties additional to what is present, which will allow
// us to add "feature" improvements. However if we wanted to do
// a structural override of how this looks, we'd need a completely
// new version. Or, if we wanted to enforce a new field as required,
// that'd be a new version.
//


/*
 * Footnotes
 */

// How github creates webhook event subscriber:
{
  "name": "web",
  "active": true,
  "events": [
    "push",
    "pull_request"
  ],
  "config": {
    "url": "http://example.com/webhook",
    "content_type": "json"
  }
}
// Thoughts: If I bring in a "meta" schema, then I can validate all event
// schemas against the preferred format of an event schema.
/
// Note: how will the schema cope with different "services" providing 
// different response types. Probably don't need to worry about it yet,
// but just interesting the think about. Could have different "events"
// which would make it straightforward to represent here, but that feels
// clunky.

// Github: has a "type/payload" structure, where there are a couple of
// fields required in the "payload" based upon event type. A hard
// version number is applied to all of the documentation. There is
// also some "common" stuff at the top level, but the documentation
// doesn't actually show it. There was a big "repository" field that
// gets added to the payload that isn't listed as required, and
// isn't referenced in any other way. It appears to be a generic
// "type" but simply isn't referred to one, and likely has more
// juicy information.
//
//  https://developer.github.com/v3/activity/events/types/
//
// Google: they have their own way of defining objects, where
// all objects have some type (also according to version!) and
// you can lookup that type via their api to perform validation
// or perhaps correct object creation via their sdk.
//
//  The @type directive identifies the object.
//
// MailChimp: They use a JSON schema, yay! They are also hard
// versioned. And they generate a new JSON schema for a new version.
// Actually the schema I found has nothing to do with the actual
// webhook event, and only to do with what we get returned on
// subscription.
//
//  https://api.mailchimp.com/schema/3.0/Lists/Webhooks/Instance.json
//
//  This is more for API side, an example of what we could return on a
//  new webhooks subscription.
//  https://us1.api.mailchimp.com/schema/3.0/Definitions/Lists/Webhooks/Response.json


// The way that the schemas are typically used is...if a particular API call
// provides a response, it may provide some additional links saying "hey, these
// are more actions you can take", and ..."by the way, if you take this action, validate
// using this 'targetSchema'"

















