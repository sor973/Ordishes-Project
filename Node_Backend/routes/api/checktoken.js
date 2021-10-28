var express = require('express');
var router = express.Router();
var _ = require('lodash');
const Mongodb = require('../../database/MongoClient');


router.all('/', async function (req, res, next) {
    // const menulist = [];
    await Mongodb.function.mongodbInitAndConnect();
    const client = Mongodb.instance.client;
    const db = client.db(Mongodb.variable.database_name);
    const collection = db.collection('token');
    const findResult = await collection.find({ "token": req.body.token }).toArray();
    console.log(findResult);
    if (_.isEmpty(findResult)) {
        return res.status(200).send({
            "exist": false,
            "message": "Token not avaliable"
        });
    }
    if (!_.isEmpty(findResult)) {
        return res.send({
            "exist": true,
            "message": "Token avaliable"
        });
    }

});

module.exports = router;