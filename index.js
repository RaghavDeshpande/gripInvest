require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
const UserServlet = require("./servlets/user/user.servlet");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get("/api", (request, response) => {
    console.log("running");
    response.send("running");
});
app.post(`/api/user`, UserServlet.put)
console.log(`listening on ${port}`);

// console.log(connection);
app.listen(port);