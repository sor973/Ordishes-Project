var express = require('express');
var router = express.Router();
var mqtt = require('mqtt')
const { MongoClient } = require('mongodb');

const url = 'mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false';
const dbName = 'development';

router.all('/', async function(req, res, next) {

    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('development_stage');
    const findResult = await collection.find({table:19}).toArray();
    console.log('Found documents =>', findResult);

    
    res.send(findResult);

  });
  
module.exports = router;

