require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT
app.get("/api", (request, response) => {
    console.log("running");
    response.send("running");
})
console.log(`listening on ${port}`)
app.listen(port);