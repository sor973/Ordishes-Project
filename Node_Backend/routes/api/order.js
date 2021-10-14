var express = require('express');
var router = express.Router();
var mqtt = require('mqtt')
var _ = require('lodash');

const { MongoClient } = require('mongodb');
const { range } = require('lodash');

const url = 'mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false';
const dbName = 'development';

const option = {
  username: "cpre_softdev",
  password: "2iyi7xdCR3rLjX6b4V6e99oKHwnAwFcQ"
};

router.all('/', async function(req, res, next) {

    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('development_stage');
    const collection2 = db.collection('orderfornode');

    var resp = req.body;
    console.log(resp);

    if(resp.Customerorder.datatype == 2 ) {
      const data = resp.Customerorder
      const data2 = resp.Customerorder2
      const jsonStr = JSON.stringify(data);
      const jsonStr2 = JSON.stringify(data2);
      const client = mqtt.connect("mqtt://192.168.42.201:1884",option);
      client.on('connect', function () {
            client.publish('/ordish/', jsonStr);
            client.publish('/ordish/', jsonStr2);
            console.log("Connected to ordish");
          })
      
      client.on('message', function (topic, message) {
        console.log(message.toString())
        client.end()
      })
      
      return res.send("Order Assign")
    }

    if(resp.Customerorder.datatype == 3){
      var list = [];
      const findstatus = await collection.find({datatype:4,token:resp.Customerorder.token}).toArray();
      for (let i = 0; i < (findstatus.length); i++){
        list.push(findstatus[i].menu[0]);
      }
      console.log(list)
      return res.send(findstatus[0])
    }

    if(resp.Customerorder.datatype == 6){
      var list = {};
      const findorder = await collection2.find({datatype:7,token:resp.Customerorder.token}).toArray();
      for (let i = 0; i < (findorder.length); i++) {
        list = Object.assign({}, list, findorder[i].menu);
      }
      return res.send(list)
    }
  });
  
module.exports = router;

