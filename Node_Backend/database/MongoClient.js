const { MongoClient } = require('mongodb');

const connection_string = 'mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false';
const database_name = 'ordishes';

async function mongodbInitAndConnect(){
    if(!Mongodb.instance.client){
        Mongodb.instance.client = new MongoClient(connection_string);
        await Mongodb.instance.client.connect();
        return;
    }
    return;
}

const Mongodb = {
    instance: {
        client: undefined
    },
    function: {
        mongodbInitAndConnect
    },
    variable: {
        database_name
    }
}

module.exports = Mongodb
