var express = require('express');
var router = express.Router();
var generator = require('generate-password');
var mqtt = require('mqtt')

const option = {
  username: "cpre_softdev",
  password: "2iyi7xdCR3rLjX6b4V6e99oKHwnAwFcQ"
};

router.all('/', function(req, res, next) {

    let resp = req.body;

    if(!Number.isInteger(resp.table)){
      return res.status(400).send("Table number need to be an integer.");
    }

    if(resp.table<1 || resp.table>50){
      return res.status(400).send("Invalid Table Number");
    }

    var key = generator.generate({length: 10,numbers: true});
    const data = {"datatype": 1, "Table": resp.table,"token": key}
    const jsonStr = JSON.stringify(data);
    
    let web  = `https://www.ordishes.com/?token=${key}`;
    

    const client = mqtt.connect("mqtt://192.168.42.201:1884",option);
    
    client.on('connect', function () {
          client.publish('/urlapi/', jsonStr)
          console.log("Connected OK")
        })
    
    client.on('message', function (topic, message) {
      console.log(message.toString())
      client.end()
    })
    console.log(jsonStr);
    res.send(web);
  });
  
module.exports = router;

