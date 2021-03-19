
const _ = require("underscore");
const DATABASE_CONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    waitForConnections: true,
    connectionLimit: process.env.POOL_SIZE
}

const QUERY_TYPE = {
    INSERT: "insert",
    SELECT: "select",
    UPDATE: "update"
}

const TRANSACTION = {
    "LOAD": "load",
    "WITHDRAW": "withdraw",
    "INVEST": "invest",
    "RETURNS": "returns"
}

const STATUS = {
    "SUCCESS": "success",
    "FAILED": "failed",
    "PENDNG": "pending"
}

function getSelectList(selectList) {
    selectList = selectList && typeof selectList === "string" ? JSON.parse(selectList) : selectList;
    selectList = selectList && Array.isArray(selectList) ? selectList : null;
    return selectList && selectList.length ? selectList.join(",") : "*";
}

function getWhereClause(where) {
    where = where && typeof where === "string" ? JSON.parse(where) : where;
    where = where && Array.isArray(where) ? where : null;
    let findStatement = "";
    for (let i = 0; i < where.length; i++) {
        findStatement = findStatement || "WHERE";
        let key = Object.keys(where[i]).pop();
        let value = Object.values(where[i]).pop();
        if (typeof value === "string") {
            findStatement += ` ${key} = "${value}"`;
        } else if (typeof value === "number") {
            findStatement += ` ${key} = ${value}`;
        }
        if (where[i + 1]) {
            findStatement += " AND";
        }
    }
    return findStatement;
}

function getUpdateFields(object) {
    object = _.isEmpty(object) ? {} : object;
    let keys = Object.keys(object);
    let values = Object.values(object);
    let update = "";
    for (let i = 0; i < keys.length; i++) {
        if (values[i] && typeof values[i] === "string") {
            update += `${keys[i]} = "${values[i]}"`;
        } else if (typeof values[i] === "number") {
            update += `${keys[i]} = ${values[i]}`;
        }
        if (keys[i + 1]) {
            update += ", "
        }
    }
    return update;
}

module.exports = {
    DATABASE_CONFIG, QUERY_TYPE, TRANSACTION, STATUS,
    getSelectList, getWhereClause, getUpdateFields
}