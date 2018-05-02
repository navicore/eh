#!/usr/bin/env node

const { EventHubClient, EventPosition } = require('azure-event-hubs');

const client = EventHubClient.createFromConnectionString(process.env["EVENTHUB_CONNECTION_STRING"], process.env["EVENTHUB_NAME"]);

async function main() {
  const onError = (err) => {
    console.log("An error occurred on the receiver ", err);
  };
  
  const onMessage = (eventData) => {
    console.log(eventData.body);
    const enqueuedTime = eventData.annotations["x-opt-enqueued-time"];
    console.log("Enqueued Time: ", enqueuedTime);
  };

  //const receiveHandler = client.receive("1", onMessage, onError, {consumerGroup: "bits1", eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  const receiveHandler = client.receive("1", onMessage, onError, {consumerGroup: "bits1", eventPosition: EventPosition.fromOffset("-1", true) });

  // To stop receiving events later on...
  //await receiveHandler.stop();
}

main().catch((err) => {
  console.log(err);
});
