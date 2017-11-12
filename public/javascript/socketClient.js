var socket = io();
socket.on('connect', function() {
    console.log("I'm connected!");
});
socket.on('update', function(params) {
    updateLocalElement(params);
});

var onLocalUpdate = function(params) {
    socket.emit('update', params);
}

var updateLocalElement = function(params) {
    var element = $('#' + params.uuid);
    if (element.length) {
        element.val(params.text);
    }
    else {
        element = newText(params);
    }
};