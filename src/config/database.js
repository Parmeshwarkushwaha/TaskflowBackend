const mongoose = require('mongoose');

const connectDatabase = async () => {
//   const databaseUrl = process.env.MONGODB_URI;

//   if (!databaseUrl) {
//     throw new Error('MONGODB_URI is required in environment variables');
//   }

//   await mongoose.connect(databaseUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongodb connected successfully");
    
} catch (error) {
    console.log(error);
    
}
};

module.exports = connectDatabase;
