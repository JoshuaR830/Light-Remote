const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var names = [];
var scores = {};

var categories = ["christmas", "sport", "france", "technology", "animals", "books", "countries", "politics"]
var initialCharades = [
    ["Christmas tree", "Snowball", "Tin of roses"], 
    ["Footballer", "Tennis player", "Snooker player"], 
    ["Baguette", "Eiffel Tower", "Croissant", "Louvre", "Mont St Michel", "Arc du triomphe", "Moulin Rouge", "Beret", "Salted butter", "Breton top (stripey long-sleeved tshirt)", "Champagne", "the French flag"],
    ["Computer", "Phone", "Robot", "Computer mouse", "Computer keyboard", "Headphones", "MP3 player", "Facebook", "Texting", "Camera", "TV", "Kindle", "App (application)"],
    ["Emu", "ostrich", "ant eater", "armadillo", "giraffe", "dolphin", "turtle", "elephant", "Lion", "koala", "kangaroo", "hedgehog", "piranha", "jelly fish", "sea urchin", "jelly fish", "squid", "Penguin", "otter", "narwhal", "unicorn", "bear", "lemur", "highland cow", "hardy sheep", "centipede", "dragon", "marmot", "meerkat", "sloth", "panda"],
    ["Pride and Prejudice", "The Famous Five", "James and the Giant Peach", "The Bible", "Sherlock Holmes", "Little Red Riding Hood", "Peter Rabbit", "Little Women", "To kill a mockingbird", "Harry Potter", "1984", "Animal Farm", "The Cat in the Hat", "Romeo and Juliet", "Of Mice and Men", "Alice in Wonderland", "The Lion, the Witch and the Wardrobe"],
    ["Finland", "France", "Germany", "North Korea", "China", "Mexico", "Antarctica", "Morocco", "Japan", "Australia", "The Neverlands", "Spain", "Switzerland", "Zimbabwe"],
    ["Brexit", "voting", "Boris Johnson", "Jeremy Corbyn", "Michael Gove", "Jacob Reese Mogg", "the houses of parliament", "Conservatives", "Labour", "Liberal Democrats", "SNP"]
]

var charades = initialCharades;

var answer;

app.use(express.static('public'));

function selectCharade() {
    
    
    do {
        var numCategories = charades.length;

        if(numCategories === 0) {
            charades = initialCharades;
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
        if(!(name in scores)) {
            names[names.length] = name;
            scores[name] = 0;
        }
        console.log(scores);
        socket.emit('load-score-data', scores, names);

    });

    socket.on('increment-score', function(name) {
        console.log(`${name} needs their score incremented`);
        scores[name] += 1;
        socket.emit('load-score-data', scores, names);
    })

    socket.on('user-revealed-answer', function() {
        console.log(`answer ${answer}`);
        socket.broadcast.emit('reveal-answer', answer);
    });

    socket.on('user-selected-new-card', function(name) {

        console.log("New");
        response = selectCharade();
        console.log(answer);
        socket.emit('my-charade', response);
        socket.broadcast.emit('set-colour', response[1]);
        socket.broadcast.emit('new-card', name);
    })
});

app.get('/', function(req, res) { 
    res.sendFile(`${process.cwd()}/LightRemote.html`);
});

app.get('/charades', function(req, res) { 
    res.sendFile(`${process.cwd()}/public/charades/Charades.html`);
});

http.listen(8000, () => console.log('Listening on port 8000!'));

