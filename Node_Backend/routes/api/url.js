var express = require('express');
var router = express.Router();
var generator = require('generate-password');
var mqtt = require('mqtt');
var _ = require('lodash');

const { MongoClient } = require('mongodb');
const url = 'mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false';
const dbName = 'development';

const option = {
  username: "cpre_softdev",
  password: "2iyi7xdCR3rLjX6b4V6e99oKHwnAwFcQ"
};


router.post('/', async function(req, res, next) {
    
    const client2 = new MongoClient(url);
    await client2.connect();
    const db = client2.db(dbName);
    const collection = db.collection('development_stage');

    var resp = req.body.Table;

    console.log(resp);

    if((resp.table) == 0)  {
      return res.status(400).send("Table number is need.");
    }

    if(!Number.isInteger(resp.table)){
      return res.status(400).send("Table number need to be an integer.");
    }

    if(resp.table<1 || resp.table>50){
      return res.status(400).send("Invalid Table Number");
    }

    const findResult = await collection.find({table:resp.table}).toArray();
  
    if (!_.isEmpty(findResult)) {
      return res.status(400).send("This Table is already assign");
    }

    var key = generator.generate({length: 10,numbers: true});
    const data = {"datatype": 1, "Table": resp.table,"token": key}
    const jsonStr = JSON.stringify(data);
    
    let web  = `https://www.ordishes.com/?token=${key}`;

    const client = mqtt.connect("mqtt://192.168.42.201:1884",option);
    client.on('connect', function () {
          client.publish('/ordish/', jsonStr)
          console.log("Connected to ordish")
        })
    
    client.on('message', function (topic, message) {
      console.log(message.toString())
      client.end()
    })
    console.log(jsonStr);
    res.send(web);
  });
  
module.exports = router;

