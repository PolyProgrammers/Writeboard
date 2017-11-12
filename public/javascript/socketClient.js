var socket = io();
socket.on('connect', function() {
    console.log("I'm connected!");
});
socket.on('update', function(params) {
    render(params);
});

//I made a change on my webpage, I want others to see it
var onLocalUpdate = function(params) {
    render(params);
    socket.emit('update', params);
}

var render = (params) => {
    switch (params.type) {
        case "text":
            var textField = $('#' + params.uuid);
            if (textField.length) {
                textField.val(params.text);
            }
            else {
                textField = $('<input>');
                textField.attr('id', params.uuid);
                textField.val(params.text);
                textField.attr('style','left:' + params.x +'px;top:' + params.y +'px;' + 'position:absolute');
                textField.appendTo(container);
            }
            return textField;
            
        case "photo":
        console.log('photo render');
            var url = 'https://res.cloudinary.com/writeboard/image/upload/t_thumbnail-round/' + params.photo;
            var img = $('<img>');
            img.attr('id', params.uuid);
            img.attr('src', url); //need to create the attrubyte
            img.attr('style','left:' + params.x +'px;top:' + params.y +'px;' + 'position:absolute');
            img.appendTo(container);
            return img;
    }
  };