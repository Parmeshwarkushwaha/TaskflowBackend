const mongoose = require('mongoose');

const connectDatabase = async () => {
  const databaseUrl = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!databaseUrl) {
    throw new Error('MongoDB connection string is missing');
  }

  await mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDatabase;
