#!/usr/bin/env node

const { EventHubClient, EventPosition } = require('azure-event-hubs');

const client = EventHubClient.createFromConnectionString(process.env["EVENTHUB_CONNECTION_STRING"], process.env["EVENTHUB_NAME"]);

const DATA = '{"msg":"hi", "id": 123}';

async function send(data, key) {
  console.log("sending key " + key)
  const eventData = { body: data, partitionKey: key};
  const delivery = await client.send(eventData);
  //const delivery = await client.send(eventData,1);
  console.log("message sent successfully.");
  process.exit(1)
}

const parsedData = JSON.parse(DATA);
const key = parsedData.id;

send(DATA, key).catch((err) => {
  console.log(err);
});

