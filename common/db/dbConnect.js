const mongoose = require("mongoose");

const connectDB = (dbname) => {
    let mongoDbString = `mongodb://adminsector:AAAaaa111@cluster0-shard-00-00.dkwwo.mongodb.net:27017,cluster0-shard-00-01.dkwwo.mongodb.net:27017,cluster0-shard-00-02.dkwwo.mongodb.net:27017/${dbname}?ssl=true&replicaSet=atlas-ba5khr-shard-0&authSource=admin&retryWrites=true&w=majority`;

    mongoose.connect(mongoDbString, {useNewUrlParser: true, useUnifiedTopology: true});

    let db = mongoose.connection;

    db.on('error', () => console.error('Connection Error'));
    db.once('open', () => {
        db.db.stats((err, data) => {
          exports.collectionSize = data.objects;
        })
        console.log(`Connected Successfully to ${dbname} DB`)
    })
  }

module.exports = connectDB;