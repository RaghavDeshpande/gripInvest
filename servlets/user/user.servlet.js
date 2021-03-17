const User = require("./model/user.model");
const _ = require("underscore");
class UserServlet {
    static async put(req, res) {
        try {
            let { body } = req;
            if (_.isEmpty(body)) {
                throw new Error("Empty object");
            }
            let data = await User.put(body);
            res.send(data);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
        return;
    }
}

module.exports = UserServlet;