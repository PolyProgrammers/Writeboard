var MongoClient = require('mongodb').MongoClient,
    test = require('assert');

var url =  "mongodb://wall:wall@ds259305.mlab.com:59305/heroku_fthfkxg6";
console.log(url)
// Connect to the db
MongoClient.connect(url, function (err, db) {
    if(err) { return console.dir(err); }
    // https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
    console.log('CONNECTED');
    db.createCollection('test', {strict:true}, function(err, collection) {});
    var collection = db.collection('test');
    var doc1 = {'hello':'doc1'};
    var doc2 = {'hello':'doc2'};
    var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];
    collection.insert(lotsOfDocs, {w:1}, function(err, result) {});
                
});