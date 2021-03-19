const QueryHelper = require("../utils/query-helper");
const QueryObject = require("../utils/query-object");
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
        let queryObject = new QueryObject();
        queryObject.where.push({ id: result.insertId });
        let wallet = await Wallet.get(queryObject);
        return wallet;
    }

    static async get(obj) {
        let result = await QueryHelper.executeQuery(QUERY_TYPE.SELECT, TABLENAME, obj);
        return result && result.length === 1 ? result.pop() : result;
    }

    static async update(obj) {
        await QueryHelper.executeQuery(QUERY_TYPE.UPDATE, TABLENAME, obj);
        let result = await Wallet.get({ where: obj.where });
        return result;
    }
}

module.exports = Wallet;