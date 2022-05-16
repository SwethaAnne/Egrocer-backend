var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');

var app = express();
var server = http.createServer(app);

var service_router = require('./routes/index');

var db = require('./models/db');

app.use(cors());
app.use(bodyParser.json());
app.use('/', service_router);

app.get("/", (req, res) => {
    console.log(`Welcome to egrocery`);
    res.status(200).json({
        success: true,
        message: `Welcome to egrocery`
    });
});

server.listen(4000, () => {
    console.log(`Egrocery server started on PORT: 4000`);
});