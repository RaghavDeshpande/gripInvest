const UserModule = require("../modules/user.module");
const _ = require("underscore");
class UserServlet {
    static async create(req, res) {
        try {
            let { body } = req;
            if (_.isEmpty(body)) {
                throw new Error("Empty object");
            }
            let result = await UserModule.create(body);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.toString());
        }
    }

    static async get(req, res) {
        try {
            let { body } = req;
            if (_.isEmpty(body)) {
                throw new Error("Empty query object");
            }
            let data = await UserModule.get(body);
            res.status(200).send(data);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.toString());
        }
    }

    static async put(req, res) {
        try {
            let { body } = req;
            if (_.isEmpty(body)) {
                throw new Error("Empty put request");
            }
            let result = await UserModule.put(body);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.toString());
        }
    }
}

module.exports = UserServlet;