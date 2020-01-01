const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


var names = [];

var charades = ["Christmas tree", "Snowball", "Tin of roses"]

var answer;

app.use(express.static('public'));

function selectCharade() {
    var numCharades = charades.length;
    var charadeToSelect = (Math.floor(Math.random() * 10) % numCharades);
    var answer = charades[charadeToSelect];

    console.log(charades);

    charades.splice(charadeToSelect, 1);

    console.log(charades);
    console.log(answer);

    return answer;
}

io.on('connection', function(socket) {
    console.log('user logged in');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('new-user-name', function(name) {
        console.log(name);
        names[names.length] = name;
        console.log(names);
    });

    socket.on('user-revealed-answer', function() {
        socket.broadcast.emit('reveal-answer', answer);
    });

    socket.on('user-selected-new-card', function() {
        console.log("New");
        answer = selectCharade();
        socket.emit('my-charade', answer);
        socket.broadcast.emit('new-card');
    })
});

app.get('/', function(req, res) { 
    res.sendFile(`${process.cwd()}/LightRemote.html`);
});

app.get('/charades', function(req, res) { 
    res.sendFile(`${process.cwd()}/public/charades/Charades.html`);
});

http.listen(8000, () => console.log('Listening on port 8000!'));