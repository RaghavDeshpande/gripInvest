const QueryHelper = require("../utils/query-helper");
const QueryObject = require("../utils/query-object");
const { QUERY_TYPE } = require("../utils/utils");
const TABLENAME = "address_details";

class AddressDetails {
    static async create(body) {
        let result = await QueryHelper.executeQuery(QUERY_TYPE.INSERT, TABLENAME, body);
        let queryObject = new QueryObject();
        queryObject.where.push({ id: result.insertId });
        let address = await AddressDetails.get(queryObject);
        return address;
    }

    static async get(query) {
        let address = await QueryHelper.executeQuery(QUERY_TYPE.SELECT, TABLENAME, query);
        return address && address.length === 1 ? address.pop() : address;
    }
}
module.exports = AddressDetails;