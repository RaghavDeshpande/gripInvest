const mysql = require('mysql2/promise');
const { DATABASE_CONFIG, QUERY_TYPE } = require("./utils");
const _ = require("underscore");
class QueryHelper {
    constructor() {
        this.pool = mysql.createPool(DATABASE_CONFIG);
    }

    getInsertQuery(tableName, body) {
        let keys = Object.keys(body);
        let wildCardArr = _.map(keys, e => "?");
        keys = keys.join(",");
        let statement = `INSERT INTO ${tableName} (${keys}) values (${wildCardArr.join(",")})`;
        let values = Object.values(body);
        return {
            statement,
            values
        }
    }

    async executeQuery(type, tableName, body) {
        var queryObject;
        switch (type) {
            case QUERY_TYPE.INSERT:
                queryObject = this.getInsertQuery(tableName, body);
                break;
            default:
                queryObject = null;
                break;
        }
        if (queryObject) {
            let connection = await this.pool.getConnection();
            let data = await connection.execute(queryObject.statement, queryObject.values);
            this.pool.releaseConnection(connection);
            return data;
        } else {
            return false;
        }

    }
}

module.exports = new QueryHelper();