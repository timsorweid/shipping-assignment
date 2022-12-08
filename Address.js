module.exports = class Address {
     constructor(name, units) {
          this.name = name;
          this.units = units;
     }

     get normalizedAddress() {
          this.normalizedName = this.name.replace(/[^a-zA-Z]/g, ""); // replaces all non alpha character
          this.units.forEach((unit) => {
               this.normalizedName = this.normalizedName.replace(unit, "");
          });
          return this.normalizedName;
     }
};
