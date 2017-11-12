var container = $("#contentContainer");
container.click(getClickPosition);

function uuidv4() {
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
}

var newText = function(params) {
    $.tmpl(input, params).appendTo( "#contentContainer" );
    var ele = $('#' + params.uuid);

    ele.val(params.text);

    return ele;
}

function getClickPosition(e) {
    var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x;
    var yPosition = e.clientY - parentPosition.y;
    
    //generate the textfield
    var uuid = uuidv4();
    var params = {
        "uuid": uuid,
        "x" : xPosition,
        "y" : yPosition
    };
    
    //assign behaviors to the object
    var ele = newText(params);
    ele.focus();
    ele.on('input', function(e) {
        var params = {
            "uuid": e.target.id,
            "x": e.target.offsetLeft,
            "y": e.target.offsetTop,
            "text": e.target.value
        };
        onLocalUpdate(params);
    })
    ele.focusout(function(e) {

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