var express = require('express');
var router = express.Router();
var mqtt = require('mqtt')

const option = {
  username: "cpre_softdev",
  password: "2iyi7xdCR3rLjX6b4V6e99oKHwnAwFcQ"
};

router.all('/', function(req, res, next) {
    const client = mqtt.connect("mqtt://192.168.42.201:1884",option);
    let {name} = req.body

    var key = generator.generate({length: 10,numbers: true});
    const data = {"datatype": 1, "Table": name,"token": key}
    const jsonStr = JSON.stringify(data);
    
    let web  = `https://www.ordishes.com/?token=${key}`;
    
    client.on('connect', function () {
          client.publish('/orderapi/', jsonStr)
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

