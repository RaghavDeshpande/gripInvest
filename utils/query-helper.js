const mysql = require('mysql2/promise');
const { DATABASE_CONFIG, QUERY_TYPE, getWhereClause, getSelectList, getUpdateFields } = require("./utils");
const _ = require("underscore");
const { object } = require('underscore');
class QueryHelper {
    constructor() {
        this.pool = mysql.createPool(DATABASE_CONFIG);
    }

    getInsertQuery(tableName, body) {
        if (_.isEmpty(body) || !tableName) {
            return null;
        }
        let keys = Object.keys(body);
        let wildCardArr = _.map(keys, e => "?");
        keys = keys.join(",");
        const statement = `INSERT INTO ${tableName} (${keys}) values (${wildCardArr.join(",")})`;
        let values = Object.values(body);
        return {
            statement,
            values
        }
    }

    getSelectQuery(tableName, query) {
        if (!tableName) {
            return null;
        }
        let selectList = getSelectList(query.selectList);
        let findStatement = getWhereClause(query.where);
        selectList = Array.isArray(selectList) ? selectList.join(",") : selectList;
        const statement = `SELECT ${selectList} FROM ${tableName} ${findStatement}`;
        return { statement };
    }

    getUpdateQuery(tableName, body) {
        let findStatement = getWhereClause(body.where);
        let updateFields = getUpdateFields(body.data);
        let statement = `UPDATE ${tableName} SET ${updateFields} ${findStatement}`;
        return { statement };
    }

    async executeQuery(type, tableName, body) {
        var queryObject;
        switch (type) {
            case QUERY_TYPE.INSERT:
                queryObject = this.getInsertQuery(tableName, body);
                break;
            case QUERY_TYPE.SELECT:
                queryObject = this.getSelectQuery(tableName, body);
                break;
            case QUERY_TYPE.UPDATE:
                queryObject = this.getUpdateQuery(tableName, body);
                break;
            default:
                queryObject = null;
                break;
        }
        if (queryObject) {
            try {
                var connection = await this.pool.getConnection();
                const [rows, fields] = await connection.execute(queryObject.statement, queryObject.values);
                return rows;
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                connection.release();
                // this.pool.end();
            }
        } else {
            throw new Error(`Unable to make query for ${tableName}, for ${JSON.stringify(body)}`);
        }

    }
}

module.exports = new QueryHelper();