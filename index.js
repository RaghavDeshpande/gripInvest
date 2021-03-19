require('dotenv').config()
const express = require('express');
const TransactionServlet = require('./servlets/transaction.servlet');
const app = express();
const port = process.env.PORT;
const UserServlet = require("./servlets/user.servlet");
const WalletServlet = require("./servlets/wallet.servlet");

//middleware section
app.use(express.urlencoded());
app.use(express.json())
//Routes sections
app.get("/api/ping", (request, response) => {
    console.log("running");
    response.send("running");
});
/**USER realted APIs */
app.post(`/api/user`, UserServlet.create);
app.get(`/api/user`, UserServlet.get);
app.put("/api/user", UserServlet.put);
/**Wallet related APIs */
app.put("/api/loadBalance", WalletServlet.loadBalance);
app.put("/api/withdrawBalance", WalletServlet.withdrawBalance);
app.get("/api/balance", WalletServlet.withdrawBalance);
app.post("/api/getMoney", WalletServlet.getMoneyForInvestment);
app.post("/api/callback/continueInvestment", WalletServlet.afterAuthentication)
app.post("/api/putReturns", WalletServlet.putReturns);
/**Transaction related APIs */
app.get("/api/transactions", TransactionServlet.get);


console.log(`listening on ${port}`);
app.listen(port);