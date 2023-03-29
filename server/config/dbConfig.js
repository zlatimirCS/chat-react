const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('connected', () => {
  console.log(`Mongoose connected`);
});

db.on('error', (err) => {
  console.log(`Mongoose connection error`);
});

module.exports = db;
