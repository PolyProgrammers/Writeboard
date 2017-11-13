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

var textFormat = {fontStyle:"Arial", fontSize:20, fontColor:"#000000"};
var fontList = ["Sacramento", "Lobster", "Roboto", "Inconsolata", "Play", "Handlee", "Satisfy"];
var sizeList = ["60", "100", "50"];
var colorList = [];

function updateFont(){
    function randomIndex(fontArray){
        return randIndex = Math.floor(Math.random() * fontArray.length);
    }
    textFormat.fontStyle = fontList[randomIndex(fontList)];
    textFormat.fontSize = sizeList[randomIndex(sizeList)];
    //textFormat.fontColor = colorList[randomIndex(colorList)];
    var tailURL = "/c_fit,l_text:" + textFormat.fontStyle +"_"+ textFormat.fontSize + ":$(name),g_north/empty.png"
    return tailURL
}


var generateRichText = (params) =>{
    //http://res.cloudinary.com/writeboard/image/upload/$name_!Hello%20World%20This%20is%20cool!/w_200,c_fit,l_text:Arial_60:$(name),g_north/empty.png  
    var baseURL = "http://res.cloudinary.com/writeboard/image/upload/";
    var tailURL = updateFont();
    var text = params.text;
    text = "$name_!" + text.replace(" ", "%20") + "!";
    console.log("generated rich text URL");
    return baseURL + text + tailURL;
}

var getImage = (url, params) =>{
    var img = $('<img>');
    img.attr('id', params.uuid);
    img.attr('src', url); //need to create the attribute
    img.attr('style','left:' + params.x +'px;top:' + params.y +'px;' + 'position:absolute');
    img.appendTo(container);
    console.log("appended to container");
    return img;
}

var render = (params) => {
    console.log(params.done);
    switch (params.type) {
        case "text":
            console.log("RENDER2");
            var textField = $('#' + params.uuid);
            if (params.done == "true"){
                console.log("RENDER3")
                var richText = generateRichText(params);
                console.log(richText);
                textField.remove();
                return getImage(richText, params);
            } else if (textField.length) { //checks for exsistance
                textField.val(params.text);
            } else {
                textField = $('<input>');
                textField.attr('id', params.uuid);
                textField.val(params.text);
                textField.attr('style','left:' + params.x +'px;top:' + params.y +'px;' + 'position:absolute');
                textField.appendTo(container);
            }
            return textField;       
        case "photo":
            var url = "";
            switch (params.style) {
                case "circle":
                    url = 'https://res.cloudinary.com/writeboard/image/upload/t_thumbnail-round/';
                    break;
                case "rect":
                    url = 'https://res.cloudinary.com/writeboard/image/upload/r_25,w_125/';
            }
            url = url + params.photo;
            return getImage(url, params);
    }
  };
