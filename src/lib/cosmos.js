import { CosmosClient } from "@azure/cosmos";


if (!process.env.COSMOS_DB_CONNECTION_STRING) {
    throw new Error("Missing connection string in environment variables");
  }

const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION_STRING);
const database = client.database(process.env.COSMOS_DB_DATABASE);

export const eventsContainer = database.container(process.env.COSMOS_DB_EVENTS_CONTAINER);
export const speakersContainer = database.container(process.env.COSMOS_DB_SPEAKERS_CONTAINER);
