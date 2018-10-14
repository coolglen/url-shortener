const monk = require('monk');
const connectionURL = process.env.DATABASE_MONGODB_URI || 'localhost/punyli';
const db = monk(connectionURL);

module.exports = db;