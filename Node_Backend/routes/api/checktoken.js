var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
var _ = require('lodash');

const url = 'mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false';
const dbName = 'ordishes';


router.all('/', async function (req, res, next) {

    // const menulist = [];
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
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