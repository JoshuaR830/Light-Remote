var serverAddress = "";

var currentlyActive = "red";

function setColor(color) {
    console.log(color);
    
    makeRequest(color);
}

function setStyle(color) {
    document.getElementById(currentlyActive).classList.remove("active-color");
    currentlyActive = color;
    document.getElementById(currentlyActive).classList.add("active-color");
}

function makeRequest(color) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText === "success") {
                setStyle(color);
                console.log("success");
            } else {
                console.log("Failed");
            }
        }

        xhttp.open("GET", `${serverAddress}/${color}`);
        xhttp.send();
    }
}