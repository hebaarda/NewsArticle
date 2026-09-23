

var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'));
app.use(express.json());

const analyze = require('./analyze');

console.log(__dirname);

// Variables for url and api key
const apiKey = process.env.API_KEY;


app.get('/', function (req, res) {
    res.send("This is the server API page, you may access its services via the client app.");
});


// POST Route
app.post("/", async (req, res) => {
    // 1. Get the URL from the request body
    const url = req.body.URI;
    // 2. Fetch Data from API by sending the URL and the key
    const Analyze = await analyze(url, apiKey);
    // 3. Extract values from the Analyze result
    const code = Analyze.code;
    const msg = Analyze.msg;
    const sample = Analyze.sample;
    // 4. Check for specific error codes and send error messages
    if (code === 212) {
        res.send({ msg: msg, code: code });
        return;
    } 
    if (code === 100) {
        res.send({ msg: msg, code: code });
        return;
    }
    // 5. Send the successful response
    res.send({ sample: sample, code: code });
});


// ------------------------



// Designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});


