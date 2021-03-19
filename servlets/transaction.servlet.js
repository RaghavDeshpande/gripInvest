const TransactionModule = require("../modules/transaction.module");

class TransactionServlet {
    static async get(req, res) {
        try {
            let { body } = req;
            let result = await TransactionModule.get(body);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.toString());
        }
    }
}
module.exports = TransactionServlet;