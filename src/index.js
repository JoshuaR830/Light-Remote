const express = require('express');
const app = express();
const http = require('http').createServer(app);
var bodyParser = require('body-parser');
var request = require('request');

var arduinoAddress = "http://192.168.0.76";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function(req, res) {
    console.log(req.body);
    var red = req.body.red;
    var green = req.body.green;
    var blue = req.body.blue;
    var brightness = req.body.brightness;

    request({
        url: arduinoAddress,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
        },
        body: `red=${red}&green=${green}&blue=${blue}&brightness=${brightness}`
    }, function (error, response, body) {
        console.log(response);
        if (response.body === "success") {
            res.send("success");
        }
    });
});

app.get('/', function(req, res) {
    res.sendFile(`${process.cwd()}/LightRemote.html`);
});

http.listen(8000, () => console.log('Listening on port 8000!'));