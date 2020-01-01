const express = require('express');

const app = express();
app.use(express.static('public'));


app.get('/', function(req, res) { 
    res.sendFile(`${process.cwd()}/LightRemote.html`);
});

app.get('/charades', function(req, res) { 
    res.sendFile(`${process.cwd()}/public/charades/Charades.html`);
});

app.listen(8000, () => console.log('Listening on port 8000!'));