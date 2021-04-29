const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const port = process.env.EXPRESS_PORT;

app.use(express.static('client/public'))
app.get("/", (req, res) => {
    res.sendFile( path.resolve(__dirname, "client", "public", "index.html"));
})

app.listen(port, err => {
    if(err) console.log(err);
    console.log(`Server listening on port ${port}`);
})