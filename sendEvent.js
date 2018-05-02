#!/usr/bin/env node

const { EventHubClient, EventPosition } = require('azure-event-hubs');

const client = EventHubClient.createFromConnectionString(process.env["EVENTHUB_CONNECTION_STRING"], process.env["EVENTHUB_NAME"]);

async function main() {
  const eventData = { body: "Hello World", partitionKey: "pk12345"};
  //const delivery = await client.send(eventData);
  const delivery = await client.send(eventData,1);
  console.log("message sent successfully.");
  process.exit(1)
}

main().catch((err) => {
  console.log(err);
});

