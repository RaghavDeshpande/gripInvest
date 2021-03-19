const Transaction = require("../models/transaction.model");

class TransactionModule {
    static async get(body) {
        let data = await Transaction.get(body);
        return data;
    }
}
module.exports = TransactionModule;