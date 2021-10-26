var express = require('express');
var router = express.Router();
var mqtt = require('mqtt')
var _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { range } = require('lodash');
const Mongodb = require('../../database/MongoClient');

const option = {
  username: "cpre_softdev",
  password: "2iyi7xdCR3rLjX6b4V6e99oKHwnAwFcQ"
};

router.all('/', async function(req, res, next) {
    await Mongodb.function.mongodbInitAndConnect();
    const client = Mongodb.instance.client;
    const db = client.db(Mongodb.variable.database_name);
    const collection = db.collection('Order_for_Kitchen');

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
      var statusdata = {};
      var obj = {}
      const findstatus = await collection.find({datatype:2,token:resp.Customerorder.token}).toArray();
      for (let i = 0; i < (findstatus.length); i++){
        for (let j = 0; j < (findstatus[i].menu.length); j++){
          obj[uuidv4()] = findstatus[i].menu[j];
        
        }
      }
      statusdata["status"] = obj;
      return res.send(statusdata)
    }

    if(resp.Customerorder.datatype == 6){
      var list = {};
      var obj = {}
      const findorder = await collection.find({datatype:2,token:resp.Customerorder.token}).toArray();
      console.log(findorder);
      for (let i = 0; i < (findorder.length); i++) {
        for (let j = 0; j < (findorder[i].menu.length); j++){
          obj[uuidv4()] = findorder[i].menu[j]
        }
      }
      return res.send(obj)
    }
  });
  
module.exports = router;

