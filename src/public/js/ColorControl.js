var currentlyActiveColor = "255000000";
var red = 0;
var green = 0;
var blue = 0;

function setRGB(r, g, b) {
    red = r.toString().padStart(3, 0);
    green = g.toString().padStart(3, 0);
    blue = b.toString().padStart(3, 0);

    makeColorRequest("pre-defined");
}

function setStyle(color) {

    if(color === "user-defined") {
        colorId = "custom"
    } else {
        var colorId = `${red}${green}${blue}`;
    }
    document.getElementById(currentlyActiveColor).classList.remove("active-color");
    currentlyActiveColor = colorId;
    document.getElementById(currentlyActiveColor).classList.add("active-color");
}

function submitColour() {
    red = parseInt(document.getElementById('red-manual').value, 10);
    green = parseInt(document.getElementById('green-manual').value, 10);
    blue = parseInt(document.getElementById('blue-manual').value, 10);

    if(red > 255 || red < 0) {
        red = 0;
    }

    if(green > 255 || green < 0) {
        green = 0;
    }

    if(blue > 255 || blue < 0) {
        blue = 0;
    }

    red = red.toString().padStart(3, 0);
    green = green.toString().padStart(3, 0);
    blue = blue.toString().padStart(3, 0);
    

    makeColorRequest("user-defined");
}

function makeColorRequest(color) {
    var xhttp = new XMLHttpRequest();
    var parameters = `red=${red}&green=${green}&blue=${blue}`;
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText === "success") {
                setStyle(color);
                console.log("Success");
            } else {
                console.log("Failed");
            }
        }
    }

    xhttp.open("POST", `${serverAddress}`, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(parameters);
}