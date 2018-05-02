#!/usr/bin/env node

const { EventHubClient } = require('azure-event-hubs');

const client = EventHubClient.createFromConnectionString(process.env["EVENTHUB_CONNECTION_STRING"], process.env["EVENTHUB_NAME"]);

async function main() {
  const partitionIds = await client.getPartitionIds();
  console.log("ids: " + partitionIds);
  process.exit(1)
}

main().catch((err) => {
  console.log(err);
});
