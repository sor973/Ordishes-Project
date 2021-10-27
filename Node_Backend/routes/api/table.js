var express = require('express');
var router = express.Router();
const Mongodb = require('../../database/MongoClient');


router.post('/', async function(req, res, next) {
    await Mongodb.function.mongodbInitAndConnect();
    var resp = req.body.table;
    const client = Mongodb.instance.client;
    const db = client.db(Mongodb.variable.database_name);
    const collection = db.collection('token');
    const findmenu = await collection.find({datatype:1,token:resp.token}).toArray();
    res.send(findmenu[0]);
  });
  
module.exports = router;