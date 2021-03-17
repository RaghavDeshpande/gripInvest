const QueryHelper = require("../../../utils/query-helper");
const { QUERY_TYPE } = require("../../../utils/utils");
const tableName = "user_details";
class User {
    
    static async put(obj) {
        return await QueryHelper.executeQuery(QUERY_TYPE.INSERT, tableName, obj);
    }
}

module.exports = User;