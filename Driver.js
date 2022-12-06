module.exports = class Driver {
    constructor(name) {
        this.name = name;
    };

    get normalizedName() {
        return this.name.replace(/\s/g, '');
    };

};
//export default normalizedNames;

// module.exports.names = normalizedNames;

