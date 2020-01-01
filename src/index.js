const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


var names = [];

var categories = ["christmas", "sport"]
var charades = [["Christmas tree", "Snowball", "Tin of roses"], ["Footballer", "Tennis player", "Snooker player"]]

var answer;

app.use(express.static('public'));

function selectCharade() {
    
    
    do {
        var numCategories = charades.length;

        if(numCategories === 0) {
            charades = [["Christmas tree", "Snowball", "Tin of roses"], ["Footballer", "Tennis player", "Snooker player"]]
            numCategories = charades.length;
        }

        var categoryToSelect = (Math.floor(Math.random() * 10) % numCategories);
        var numCharades = charades[categoryToSelect].length;
        if(numCharades === 0){
            charades.splice(categoryToSelect, 1);
        }

       
    } while(numCharades === 0);

    var charadeToSelect = (Math.floor(Math.random() * 10) % numCharades);

    answer = charades[categoryToSelect][charadeToSelect];
    console.log("When set" + answer);

    charades[categoryToSelect].splice(charadeToSelect, 1);
    if(numCategories > 0) {
        return [answer, categories[categoryToSelect]];
    }
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
        console.log(`answer ${answer}`);
        socket.broadcast.emit('reveal-answer', answer);
    });

    socket.on('user-selected-new-card', function() {
        console.log("New");
        response = selectCharade();
        console.log(answer);
        socket.emit('my-charade', response);
        socket.broadcast.emit('set-colour', response[1]);
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

