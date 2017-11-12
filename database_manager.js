var MongoClient = require('mongodb').MongoClient,
    test = require('assert');
var url =  "mongodb://wall:wall@ds259305.mlab.com:59305/heroku_fthfkxg6";
var databaseMode = true;

class DatabaseManager {
    
    constructor() {
        // Connect to the db
        var callback = (db) => {
            this.database = db;
        }   
        if (databaseMode) {
            MongoClient.connect(url, function (err, db) {
                if(err) { return console.dir(err); }
                // https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
                callback(db);
            });        
        } else {
           console.log("database mode is off")
        }
    }
    
    getAll(callback) { 
        if (databaseMode) {
            var collection = this.database.collection('wall');
            collection.find().toArray(function(err, items) {
                callbackWith(items)
            });
        }
    }

    putDummyData() {
        var doc1 = {'hello':'doc1'};
        var doc2 = {'hello':'doc2'};
        var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}, doc1, doc2];
        if (databaseMode) {
           var collection = this.database.collection('test2');
           this.database.createCollection('test2', {strict:true}, function(err, collection) {});
           collection.insert(lotsOfDocs, {w:1}, function(err, result) {});
           var collection = this.database.collection('test2');
        }
    }

    update(key, record) {
        if (databaseMode) {
            var collection = this.database.collection('wall');
            collection.update(key, {$set:record}, {upsert: true}, function(err, result) {
               if(err) { return console.dir(err); }
            });
        }

    }
}

module.exports = new DatabaseManager();

return;
var dbm = new DatabaseManager();

var callbackWith = (items) => {
            console.log("items fetched:")
            console.log(items)
            return items;
}

setTimeout(() => {
    var test_id = {key: "123"}
    console.log("Running DBM tests:");
    dbm.update(test_id, {key: "123", "fieldtoupdate": "field123" });
    dbm.update(test_id , {key: "123", "fieldtoupdate": "field456" });
    console.log("Update() Test completed.");
    dbm.getAll(callbackWith);
    console.log("GetAll Test completed.")
}, 5000);
