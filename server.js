const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Verification endpoint
app.get("/webhook", (req, res) => {
    const VERIFY_TOKEN = "myverifytoken123";
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
        console.log("Webhook verified!");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Handle incoming messages
app.post("/webhook", (req, res) => {
    console.log("Received message:", req.body);
    res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running on port 3000"));