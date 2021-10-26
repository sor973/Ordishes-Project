var express = require('express');
var router = express.Router();
const Mongodb = require('../../database/MongoClient');


router.get('/', async function(req, res, next) {
    await Mongodb.function.mongodbInitAndConnect();
    const client = Mongodb.instance.client;
    // const menulist = [];
    const db = client.db(Mongodb.variable.database_name);
    const collection = db.collection('Menu');
    const findmenu = await collection.find({datatype:20}).toArray();
    // menulist.push(findmenu)
    res.send(findmenu[0]);

  });
  
module.exports = router;

