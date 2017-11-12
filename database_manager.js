var MongoClient = require('mongodb').MongoClient,
    test = require('assert');
var url =  "mongodb://wall:wall@ds259305.mlab.com:59305/heroku_fthfkxg6";
    

class DatabaseManager {
    
    constructor() {
        // Connect to the db
        var callback = (db) => {
            this.database = db;
        }   
        
        MongoClient.connect(url, function (err, db) {
            if(err) { return console.dir(err); }
            // https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
            callback(db);
        });        
    }
    
    getAll(callback) { 
        
        var collection = this.database.collection('test2');
        collection.find().toArray(function(err, items) {
            callbackWith(items)
        });
    }

    putDummyData() {
        var collection = this.database.collection('test2');
        var doc1 = {'hello':'doc1'};
        var doc2 = {'hello':'doc2'};
        var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}, doc1, doc2];
        this.database.createCollection('test2', {strict:true}, function(err, collection) {});
        collection.insert(lotsOfDocs, {w:1}, function(err, result) {});
        var collection = this.database.collection('test2');
    }

    update(key, record) {
        var collection = this.database.collection('wall');
        collection.insert(record, {w:1}, function(err, result) {
            console.log(err);
            collection.update(key, record, {w:1}, function(err, result) {
                console.log(err);
            });
        });
    }
}

module.exports = new DatabaseManager();
var dbm = new DatabaseManager();

var callbackWith = (items) => {
            console.log("items fetched:")
            console.log(items)
            return items;
}

setTimeout(() => {
    console.log("Running DBM tests:");
    dbm.update({_id:1} , {"fieldtoupdate": "field123" });
    dbm.update({_id:1} , {"fieldtoupdate": "field456" });
    console.log("Update() Test completed.");
    dbm.getAll(callbackWith);
    console.log("GetAll Test completed.")
}, 5000);
