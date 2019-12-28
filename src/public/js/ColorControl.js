var currentlyActiveColor = "red";

function setColor(color) {
    console.log(color);
    makeColorRequest(color);
}

function setStyle(color) {
    document.getElementById(currentlyActiveColor).classList.remove("active-color");
    currentlyActiveColor = color;
    document.getElementById(currentlyActiveColor).classList.add("active-color");
}

function makeColorRequest(color) {
    var xhttp = new XMLHttpRequest();
    console.log(serverAddress);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText === "success") {
                setStyle(color);
                console.log("Success");
            } else {
                console.log("Failed");
            }
        }

        xhttp.open("GET", `${serverAddress}/${color}`);
        xhttp.send();
    }
}