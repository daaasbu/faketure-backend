const MongoClient = require("mongodb").MongoClient;

const connectionString = "mongodb://13879c75-0ee0-4-231-b9ee:KPjFkGe2keEbATdEUOuNHuUX2g9zWb9zCxLQf8w1dDVBFKqnWX4fKDdYORNgKvXEVUwiYuFiUvdp85iSmu2oNw%3D%3D@13879c75-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true"


function getClient() {
    const client = new MongoClient(connectionString);
    return client.connect();
}

module.exports = { getClient };