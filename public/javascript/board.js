var container = $("#contentContainer");
container.dblclick(onClick);

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//get position of the click
function getClickPosition(e) {
    var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x;
    var yPosition = e.clientY - parentPosition.y;
    return {
        x: xPosition,
        y: yPosition
    };
}

function setupTextInput(e) {
    var pos = getClickPosition(e);

    //generate the textfield
    var uuid = uuidv4();
    var params = {
        "type": "text",
        "uuid": uuid,
        "x" : pos.x,
        "y" : pos.y
    };

    //assign behaviors to the object
    var ele = render(params);
    ele.focus();
    ele.on('input', function(e) {
        var cleanText = e.target.value.replace(/>/g, "&gt;");  //.replace(/</g, "&lt;") left out for <3
        var params = {
            "type": "text",
            "uuid": e.target.id,
            "x": e.target.offsetLeft,
            "y": e.target.offsetTop,
            "text": cleanText
        };
        onLocalUpdate(params);
    })
    ele.focusout(function(e) {
        var cleanText = e.target.value.replace(/>/g, "&gt;");  //.replace(/</g, "&lt;") left out for <3
        var params = {
            "type": "text",
            "uuid": e.target.id,
            "x": e.target.offsetLeft,
            "y": e.target.offsetTop,
            "text": cleanText,
            "done": "true"
        };

        onLocalUpdate(params);
        //console.log("done is true");
        if (ele.text === "") {
            ele.remove();
            return;
        }

        ele.addClass("readOnly");
        ele.keypress(function(e) {
            e.preventDefault();
        })
    });
}

var insert = function(option, arg) {
    popup.remove();
    switch (option) {
        case "text":
            setupTextInput(lastClickEvent);
            break;
        case "photo":
            cloudinaryUpload(lastClickEvent, arg);
    };
};

var popup = $('#popup');
var prevExp = null;
var lastClickEvent = null;
//when the view is clicked
function onClick(e) {
    var pos = getClickPosition(e);
    lastClickEvent = e;

    clearTimeout(prevExp);
    popup.remove();
    popup.attr('style','left:' + (pos.x - 50) +'px;top:' + (pos.y - 50) +'px;');
    popup.appendTo(container);
    popup.focus();
    popup.focusout(function(e) {
        popup.remove();
    });
    prevExp = setTimeout(function() {
        popup.remove();
    }, 10000);
}

// Helper function to get an element's exact position
function getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

function cloudinaryUpload(e, style) {
    var pos = getClickPosition(e);

    var uuid = uuidv4();
    var name = "wallflower_" + uuid;
    var options = {
      public_id: name, 
      cloud_name: 'writeboard',
      upload_preset: 'wallphotos',
      sources: ['local','url','camera']
    };
    
    //generate the textfield
    var params = {
        "type": "photo",
        "uuid": uuid,
        "x" : pos.x,
        "y" : pos.y,
        "style": style
    };
    
    cloudinary.openUploadWidget(options, 
      function(error, result) {
      
      if (error) {
        console.log(error);
      }
      if (result) {  
        console.log(result[0]);
        params.photo = result[0].public_id;
        
        onLocalUpdate(params);
        console.log(result);
      }
    });
  }
  
