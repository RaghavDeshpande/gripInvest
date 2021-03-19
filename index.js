require('dotenv').config()
const express = require('express');
const User = require('./models/user.model');
const app = express();
const port = process.env.PORT;
const UserServlet = require("./servlets/user.servlet");
app.use(express.urlencoded());
app.use(express.json())
app.get("/api/ping", (request, response) => {
    console.log("running");
    response.send("running");
});
/**USER realted APIs */
app.post(`/api/user`, UserServlet.create);
app.get(`/api/user`, UserServlet.get);
app.put("/api/user", UserServlet.put);
/**Wallet related APIs */


console.log(`listening on ${port}`);

// console.log(connection);
app.listen(port);