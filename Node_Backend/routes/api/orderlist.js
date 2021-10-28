var express = require('express');
var router = express.Router();
const Mongodb = require('../../database/MongoClient');


router.get('/', async function(req, res, next) {
    await Mongodb.function.mongodbInitAndConnect();
    const client = Mongodb.instance.client;
    const db = client.db(Mongodb.variable.database_name);
    const collection = db.collection('Order_Customer');
    const findmenu = await collection.find({datatype:8}).toArray();
    res.send(findmenu);

  });
  
module.exports = router;
