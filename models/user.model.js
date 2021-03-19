const { response } = require("express");
const QueryHelper = require("../utils/query-helper");
const { QUERY_TYPE } = require("../utils/utils");
const TABLENAME = "user_details";

class User {

    static async create(obj) {
        /**@todo: save password using salt */
        let result = await QueryHelper.executeQuery(QUERY_TYPE.INSERT, TABLENAME, obj);
        let queryObject = {
            where: [{ id: result.insertId }]
        }
        let user = await User.get(queryObject);
        return user;
    }

    static async get(query) {
        let result = await QueryHelper.executeQuery(QUERY_TYPE.SELECT, TABLENAME, query);
        return result && result.length === 1 ? result.pop() : result;
    }

    static async update(body) {
        await QueryHelper.executeQuery(QUERY_TYPE.UPDATE, TABLENAME, body);
        let result = await User.get({ where: body.query });
        return result;
    }
}

module.exports = User;