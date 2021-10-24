var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false';
const dbName = 'ordishes';


router.get('/', async function(req, res, next) {
  
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Order_Customer');
    const findmenu = await collection.find({datatype:8}).toArray();
    res.send(findmenu);

  });
  
module.exports = router;
