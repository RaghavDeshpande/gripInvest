const User = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const _ = require("underscore");
const AddressDetails = require("../models/address.model");
class UserModule {
    static async create(body) {
        let result = {};
        let { address = null } = body;
        delete body.address;
        let user = await User.create(body);
        result.user = user;
        if (body.pan) {
            let wallet = { userId: user.id }
            wallet = await Wallet.create(wallet);
            result.wallet = wallet;
        }
        if (address) {
            address = {
                ...address,
                userId: user.id
            }
            address = await AddressDetails.create(address);
            result.address = address;
        }
        return result;
    }

    static async get(query) {
        let data = await User.get(query);
        return data;
    }
    static async put(body) {
        let data = await User.update(body);
        return data;
    }
}
module.exports = UserModule;