const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql://localhost/grads-offer-node",
});

client.connect();

module.exports = client;
