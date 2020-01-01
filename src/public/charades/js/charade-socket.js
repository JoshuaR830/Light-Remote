var socket = io();
var login;
var charades;

var yourCharade;

socket.on('reveal-answer', function(answer) {
    yourCharade = answer;
    console.log("Show");
    dissapear();
    setTimeout(appear, 500);
    document.getElementById('new-charade').style.display = 'inline-block';
    document.getElementById('reveal-button').style.display = 'inline-block';
});

socket.on('my-charade', function(charade) {
    yourCharade = charade[0];
    category = charade[1];
    console.log(`Category: ${category}, Charade: ${charade}` );
    setLightColour()
    setColours();
    dissapear();
    setTimeout(appear, 500);
});

function changeContent() {
    var card = this.document.getElementById('charade-card');
    var title = card.querySelector('.title');
    var body = card.querySelector('.body');

    title.innerText = yourCharade;
    body.innerText = `Act like a ${yourCharade}`
}

socket.on('new-card', function() {
    document.getElementById('new-charade').style.display = 'none';
    document.getElementById('reveal-button').style.display = 'none';
})

window.addEventListener('load', function() {
    login = document.getElementById('login');
    charades = document.getElementById('charades');
});

function hideLogin() {
    login.style.display = 'none';
    charades.style.display = 'inline-block';
}

function submitUserName() {
    var name = document.getElementById('name-input').value;
    socket.emit('new-user-name', name);
    hideLogin();
}

function revealAnswer() {
    console.log("Revealed");
    socket.emit('user-revealed-answer');
    document.getElementById('new-charade').style.display = 'inline-block';
}

function newCard() {
    console.log('new-card-selected');
    socket.emit('user-selected-new-card');
    document.getElementById('new-charade').style.display = 'none';
}

function setColours() {
    var root = document.documentElement;

    if(category === "christmas") {
        root.style.setProperty("--card-color", "rgb(181, 5, 17)");
        root.style.setProperty("--accent-color", "rgb(209, 19, 32)");
        root.style.setProperty("--border-color", "rgb(107, 20, 26)");
        root.style.setProperty("--text-color", "rgb(196, 147, 150)");
        // changeLightColour(181, 5, 17);
    } else if (category === "sport") {
        root.style.setProperty("--card-color", "rgb(18, 102, 219)");
        root.style.setProperty("--accent-color", "rgb(87, 126, 181)");
        root.style.setProperty("--border-color", "rgb(62, 86, 120)");
        root.style.setProperty("--text-color", "rgb(11, 43, 89)");
        // changeLightColour(18, 102, 219);

    }
}

function setLightColour() {
    if(category === "christmas") {
        changeLightColour(181, 5, 17);
    } else if (category === "sport") {
        changeLightColour(18, 102, 219);
    }
}

socket.on('set-colour', function(chosenCategory) {
    category = chosenCategory;
    console.log("Please set the colour");
    setColours();
});

function changeLightColour(r, g, b) {
    var xhttp = new XMLHttpRequest();
    var parameters = `red=${r}&green=${g}&blue=${b}&brightness=${175}`;
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText === "success") {
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
