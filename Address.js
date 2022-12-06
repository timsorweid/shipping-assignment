module.exports = class Address {
    constructor(name, units) {
        this.name = name;
        this.units = units;
    };

    get normalizedAddress() {
            this.normalizedName = this.name.replace(/\s/g, '').replace(/\d+/g, ''); // don't make me figure out how to do both in one regex. TODO figure out how to remove non letters
            this.units.forEach(unit => {
                this.normalizedName = this.normalizedName.replace(unit, '');
            });
            return this.normalizedName;
    };
};

// const address = new Address(shipments[4], units);
// console.log(address.normalizeAddress);
// const normalizedAddresses = address.map(address => normalizeAddress(address));
//console.log(shipments[4]);
//console.log(normalizeAddress(shipments[4], units));