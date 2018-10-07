const MongoClient = require("mongodb").MongoClient;

const connectionString = process.MONGO_CONNECTION_STRING || process.env.MONGO_CONNECTION_STRING;

function getClient() {
    const client = new MongoClient(connectionString);
    return client.connect();
}

module.exports = { getClient };