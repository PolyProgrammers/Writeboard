var MongoClient = require('mongodb').MongoClient,
    test = require('assert');

var url =  "mongodb://wall:wall@ds259305.mlab.com:59305/heroku_fthfkxg6";
console.log(url)
// Connect to the db
MongoClient.connect(url, function (err, db) {
    console.log(db);
    console.log(err);
    console.log('CONNECTED');
     //Write databse Insert/Update/Query code here..
                
});