var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');

const option = {
  username: "cpre_softdev",
  password: "2iyi7xdCR3rLjX6b4V6e99oKHwnAwFcQ"
};

router.post('/', async function (req, res, next) {

  var resp = req.body.Checkout;
  console.log(resp);

  if (resp.datatype == 8) {

    const jsonStr = JSON.stringify(resp);
    
    const client = mqtt.connect("mqtt://192.168.42.201:1884", option);
    client.on('connect', function () {
      client.publish('/ordish/', jsonStr)
      console.log("Connected to ordish")
    })

    client.on('message', function (topic, message) {
      console.log(message.toString())
      client.end()
    })
    console.log(jsonStr);
    return res.send("ok");
  }

  if (resp.datatype == 9 || resp.datatype == "a"  ) {
    const data = resp
    const jsonStr = JSON.stringify(data);

    const client = mqtt.connect("mqtt://192.168.42.201:1884", option);
    client.on('connect', function () {
      client.publish('/ordish/', jsonStr)
      console.log("Connected to ordish")
    })

    client.on('message', function (topic, message) {
      console.log(message.toString())
      client.end()
    })
    console.log(jsonStr);
    return res.send("ok");
  }
});

module.exports = router;