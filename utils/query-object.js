/**
 * @description making this into a seprate object so as to later add support of rdefault limit and skip and also other functionality.
 */
class QueryObject {
    constructor(object) {
        this.where = object && object.where ? object.where : [];
        this.selectList = object && object.selectList ? object.selectList : [];
        this.data = object && object.data ? object.data : {};
    }
}

module.exports = QueryObject;