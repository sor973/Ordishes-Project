// var express = require('express');
// var router = express.Router();
// var mqtt = require('mqtt')
// var _ = require('lodash');

// const { MongoClient } = require('mongodb');
// const { range } = require('lodash');

// const url = 'mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false';
// const dbName = 'development';

// const option = {
//   username: "cpre_softdev",
//   password: "2iyi7xdCR3rLjX6b4V6e99oKHwnAwFcQ"
// };

// router.all('/', async function(req, res, next) {

//     const client = new MongoClient(url);
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection('development_stage');

//     var resp = req.body;
//     console.log(resp);

//     if(resp.datatype == 2 || resp.datatype == 5 ){
//       const findResult = await collection.find({orderid:resp.orderid}).toArray();
  
//       if (!_.isEmpty(findResult)) {
//         return res.status(400).send("This order is already assign");
//       }
//       const data = resp
//       const jsonStr = JSON.stringify(data);
//       const client = mqtt.connect("mqtt://192.168.42.201:1884",option);
//       client.on('connect', function () {
//             client.publish('/orderapi/', jsonStr)
//             console.log("Connected to urlapi")
//           })
      
//       client.on('message', function (topic, message) {
//         console.log(message.toString())
//         client.end()
//       })
//       return 
//     }
//     // if(resp.datatype == 3){
//     //   //request status
//     //   const findstatus = await collection.find({orderid:resp.orderid},{datatype:4}).toArray();
//     //   return res.send(findstatus[0].)
//     // }
//     if(resp.datatype == 6){
//       // list of order 
//       const findorder = await collection.find({token:resp.token}).toArray();
//       for (var i = 0; i<findorder.length ; i++){
//         res.send(findorder[i].menu)
//       }
//       console.log(findorder.length)
//       return 
//     }

//   });
  
// module.exports = router;

