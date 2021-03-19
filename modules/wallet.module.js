const Wallet = require("../models/wallet.model");
const Transaction = require("../models/transaction.model");
const { TRANSACTION, STATUS } = require("../utils/utils");
const QueryObject = require("../utils/query-object");
const User = require("../models/user.model");
const _ = require("underscore");
const axio = require("axios");
const NodeCache = require("node-cache");
const InvestmentQueue = new NodeCache({ stdTTL: 300, checkperiod: 60 });
class WalletModule {
    static async loadBalance(body) {
        var transaction = {};
        try {
            let { id, userId, addAmount } = body;
            let queryObject = new QueryObject();
            if (id) {
                queryObject.where.push({ id });
            }
            if (userId) {
                queryObject.where.push({ userId });
            }
            let currentWallet = await Wallet.get(queryObject);
            let { amount } = currentWallet;
            transaction = {
                walletId: currentWallet.id,
                userId: currentWallet.userId,
                type: TRANSACTION.LOAD,
                amount: addAmount
            };
            let newAmount = (amount || 0) + addAmount;
            queryObject.data = { amount: newAmount };
            var result = await Wallet.update(queryObject);
            transaction.status = STATUS.SUCCESS;
            await Transaction.create(transaction);
            return result;
        } catch (error) {
            if (!_.isEmpty(transaction)) {
                transaction.status = STATUS.SUCCESS;
                transaction.reason = error.toString()
                await Transaction.create(transaction);
            }
            throw error;
        }
    }

    static async withdrawBalance(body) {
        var transaction = {};
        try {
            let { id, userId, withdrawAmount } = body;
            let queryObject = new QueryObject();
            if (id) {
                queryObject.where.push({ id })
            }
            if (userId) {
                queryObject.where.push({ userId })
            }
            let currentWallet = await Wallet.get(queryObject);
            let { amount } = currentWallet;
            transaction = {
                walletId: currentWallet.id,
                userId: currentWallet.userId,
                type: TRANSACTION.WITHDRAW,
                amount: withdrawAmount
            };
            let newAmount = (amount || 0) - withdrawAmount;
            if (newAmount < 0) {
                throw new Error(
                    `Amount is greater than current balance. 
                    Current  balance: ${amount}`
                );
            }
            queryObject.data = { amount: newAmount };
            let result = await Wallet.update(queryObject)
            transaction.status = STATUS.SUCCESS;
            await Transaction.create(transaction);
            return result;
        } catch (error) {
            if (!_.isEmpty(transaction)) {
                transaction.status = STATUS.SUCCESS;
                transaction.reason = error.toString()
                await Transaction.create(transaction);
            }
            throw error;
        }
    }

    static async getBalance(body) {
        let queryObject = new QueryObject(body);
        let wallet = await Wallet.get(queryObject);
        if (!wallet) {
            throw new Error("Wallet doesn't exist for this query");
        }
        return wallet;
    }

    static async initate2FInvestmant(body) {
        var transaction = {};
        try {
            let { phoneNumber, amount, refrence, webHookUrl } = body;
            let queryObject = new QueryObject();
            queryObject.where.push({ phoneNumber })
            let user = await User.get(queryObject);
            if (!user) {
                throw new Error("User doesn't exist in grip invest");
            }
            queryObject = new QueryObject();
            queryObject.where.push({ userId: user.id });
            let wallet = await Wallet.get(queryObject);
            if (!wallet) {
                throw new Error(
                    `wallet doesn't exist in grip invest for ${phoneNumber}`
                );
            }
            if (amount > wallet.amount) {
                throw new Error(`Request amount more than amount in wallet`);
            }
            queryObject = new QueryObject();
            queryObject.where.push({ id: wallet.id });
            queryObject.data = {
                amount: (wallet.amount -= amount)
            }
            transaction = {
                walletId: wallet.id,
                userId: user.id,
                type: TRANSACTION.INVEST,
                refrence: refrence,
                amount: amount
            };
            let queueEntry = {
                transaction: transaction,
                queryObject: queryObject,
                webHookUrl: webHookUrl
            }
            InvestmentQueue.set(`userId_${user.id}`, JSON.stringify(queueEntry));
             /**  
             * Initiate some kind of user authentication using otp or push notification 
             * after successful authentication, also send a call back URL witht the request so can start the next step after this.
            */
            return "2FA intitated"; // in real scenario might be returning some kind of object with amount and other transaction details.
        } catch (error) {
            if (!_.isEmpty(transaction)) {
                transaction.status = STATUS.SUCCESS;
                transaction.reason = error.toString()
                await Transaction.create(transaction);
            }
            throw error;
        }
    }

    static async afterAuthentication(body) {
        try {
            let { userId } = body;
            let key = `userId_${userId}`;
            let queueObject = InvestmentQueue.get(key);
            if (!queueObject) {
                throw new Error(`Object not found in cache. Something went wrong.`);
            }
            queueObject = JSON.parse(queueObject);
            InvestmentQueue.del(key);
            var { transaction, queryObject, webHookUrl } = queueObject;
            await Wallet.update(queryObject);
            if (webHookUrl) {
                /**
                 * My assumption is that after all validation we might be 
                 * sending a object containing certain data to a callback URL.
                 */
                await axio.post(webHookUrl, { transaction });
            }
            transaction.status = STATUS.SUCCESS;
            await Transaction.create(transaction);
            return "Success!"
        } catch (error) {
            if (transaction && !_.isEmpty(transaction)) {
                transaction.status = STATUS.SUCCESS;
                transaction.reason = error.toString()
                await Transaction.create(transaction);
            }
            throw error;
        }
    }

    static async putReturns(body) {
        var transaction = {};
        try {
            let { phoneNumber, amount, refrence } = body;
            let queryObject = new QueryObject();
            queryObject.where.push({ phoneNumber })
            let user = await User.get(queryObject);
            if (!user) {
                throw new Error("User doesn't exist in grip invest");
            }
            queryObject = new QueryObject();
            queryObject.where.push({ userId: user.id });
            let wallet = await Wallet.get(queryObject);
            if (!wallet) {
                throw new Error(
                    `wallet doesn't exist in grip invest for ${phoneNumber}`
                );
            }
            transaction = {
                walletId: wallet.id,
                userId: user.id,
                type: TRANSACTION.RETURNS,
                refrence: refrence,
                amount: amount
            };
            queryObject = new QueryObject();
            queryObject.where.push({ id: wallet.id });
            queryObject.data = {
                amount: (wallet.amount += amount)
            }
            await Wallet.update(queryObject);
            transaction.status = STATUS.SUCCESS;
            await Transaction.create(transaction);
            return "Deposit successful"; // in real scenario might be returning some kind of object with amount and other transaction details.
        } catch (error) {
            if (!_.isEmpty(transaction)) {
                transaction.status = STATUS.SUCCESS;
                transaction.reason = error.toString()
                await Transaction.create(transaction);
            }
            throw error;
        }
    }
}

module.exports = WalletModule;
