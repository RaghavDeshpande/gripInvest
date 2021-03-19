const WalletModule = require("../modules/wallet.module");

class WalletServlet {
    static async loadBalance(req, res) {
        try {
            let { body } = req;
            let result = await WalletModule.loadBalance(body);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.toString());
        }
    }

    static async withdrawBalance(req, res) {
        try {
            let { body } = req;
            let result = await WalletModule.withdrawBalance(body);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.toString());
        }
    }

    static async getBalance(req, res) {
        try {
            let { body } = req;
            let result = await WalletModule.getBalance(body);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.toString());
        }
    }

    static async getMoneyForInvestment(req, res) {
        try {
            let { body } = req;
            let result = await WalletModule.initate2FInvestmant(body);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.toString());
        }
    }

    static async afterAuthentication(req, res) {
        try {
            let { body } = req;
            let result = await WalletModule.afterAuthentication(body);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.toString());
        }
    }

    static async putReturns(req, res) {
        try {
            let { body } = req;
            let result = await WalletModule.putReturns(body);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.toString());
        }
    }
}

module.exports = WalletServlet;