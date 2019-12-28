var currentlyActiveToggles = [false, false, false];

function setToggle(toggle) {
    console.log(toggle);
    makeToggleRequest(toggle);
}

function makeToggleRequest(toggle) {
    var xhttp = new XMLHttpRequest();
    setToggleStyle(toggle);
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState === 4 &&  this.status === 200) {
    //         if (this.responseText === "success") {
    //             setToggleStyle(toggle);
    //             console.log("Success");
    //         } else {
    //             console.log("Failed");
    //         }
    //     }
    // }
}

function setToggleStyle(toggle) {
    var currentToggle = toggle - 1;
    var toggleName = `toggle-${toggle}`;

    if(currentlyActiveToggles[currentToggle]) {
        document.getElementById(toggleName).classList.remove("toggled-on");
        document.getElementById(toggleName).classList.add("toggled-off");
        console.log("Turned off");
    } else {
        document.getElementById(toggleName).classList.remove("toggled-off");
        document.getElementById(toggleName).classList.add("toggled-on");
        console.log("Turned on");
    }

    currentlyActiveToggles[currentToggle] = !currentlyActiveToggles[currentToggle]

}