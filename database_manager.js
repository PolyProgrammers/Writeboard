 var MongoClient = require('mongodb').MongoClient,
        test = require('assert');
    var url =  "mongodb://wall:wall@ds259305.mlab.com:59305/heroku_fthfkxg6";
    

class DatabaseManager {
    
    constructor() {
        // Connect to the db
        
        var callback = (db) => {
            this.database = db;
            console.log(this.ourDb);
        }   
        
        MongoClient.connect(url, function (err, db) {
            if(err) { return console.dir(err); }
            // https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
            callback(db);
        });        
    }
    
    getAll() {
        var wallCollection = this.database.collection('wall');
        wallCollection.find().toArray(function(err, items) {
            console.log(items);
            return items;
        });
    }

    putDummyData() {
        var collection2 = this.database.collection('test2');
        var doc1 = {'hello':'doc1'};
        var doc2 = {'hello':'doc2'};
        var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}, doc1, doc2];
        this.database.createCollection('test2', {strict:true}, function(err, collection) {});
        collection2.insert(lotsOfDocs, {w:1}, function(err, result) {});
        var collection = this.database.collection('test2');
    }

    update(record) {   
    }
}

module.exports = new DatabaseManager();
var dbm = new DatabaseManager();
setTimeout(() => {
    dbm.putDummyData()
}, 5000);