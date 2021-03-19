const QueryHelper = require("../utils/query-helper");
const { QUERY_TYPE } = require("../utils/utils");
const TABLENAME = "wallet";
const INITIAL_AMOUNT = 0;

class Wallet {
    static async create(obj) {
        const body = {
            userId: obj.userId,
            amount: INITIAL_AMOUNT
        }
        let result = await QueryHelper.executeQuery(QUERY_TYPE.INSERT, TABLENAME, body);
        let queryObject = {
            where: [{ id: result.insertId }]
        }
        let wallet = await Wallet.get(queryObject);
        return wallet;
    }

    static async get(obj) {
        let result = await QueryHelper.executeQuery(QUERY_TYPE.SELECT, TABLENAME, obj);
        return result && result.length === 1 ? result.pop() : result;
    }
}

module.exports = Wallet;