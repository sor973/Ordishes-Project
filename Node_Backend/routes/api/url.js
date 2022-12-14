var express = require('express');
var router = express.Router();
var generator = require('generate-password');
var mqtt = require('mqtt');
var _ = require('lodash');
const Mongodb = require('../../database/MongoClient');
const urlinfo = {
  scheme:"https",
  domain:"ordishes.cinnamonpyro.com:8444"
}

const option = {
  username: "cpre_softdev",
  password: "2iyi7xdCR3rLjX6b4V6e99oKHwnAwFcQ"
};


router.post('/', async function(req, res, next) {
    await Mongodb.function.mongodbInitAndConnect();
    const client2 = Mongodb.instance.client;
    const db = client2.db(Mongodb.variable.database_name);
    const collection = db.collection('token');

    var resp = req.body.Table;

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
    const data = {"datatype": 1, "table": resp.table,"token": key}
    const jsonStr = JSON.stringify(data);
    
    let web  = `${urlinfo.scheme}://${urlinfo.domain}/?token=${key}`;

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

