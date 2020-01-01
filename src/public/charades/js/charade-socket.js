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
    yourCharade = charade;
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
    var name = document.getElementById('user-name-entry').value;
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

