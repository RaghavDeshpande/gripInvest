const QueryHelper = require("../utils/query-helper");
const TABLENAME = "transactions";
const { QUERY_TYPE } = require("../utils/utils");

class Transaction {
    static async create(body) {
        let entry = await QueryHelper.executeQuery(QUERY_TYPE.INSERT, TABLENAME, body);
        return entry;
    }

    static async get(query) {
        let result = await QueryHelper.executeQuery(QUERY_TYPE.SELECT, TABLENAME, query);
        return result;
    }

    static async update(body) {
        await QueryHelper.executeQuery(QUERY_TYPE.UPDATE, TABLENAME, body);
        let result = await Transaction.get({ where: body.where });
        return result;
    }

}
module.exports = Transaction;