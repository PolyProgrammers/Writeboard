var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dbManager = require('./database_manager.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('newUser', dbManager.getAll());

  socket.on('update', function (params) {
    //db update
    dbManager.update(params);
    socket.broadcast.emit(params);
  });

});


setTimeout(function() {

    var params = {
      thing: "hello everyone!"
    };
    io.emit('message', params);

}, 10000);

http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
