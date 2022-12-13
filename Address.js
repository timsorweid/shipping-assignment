module.exports = class Address {
     constructor(name, units) {
          this.name = name;
          this.units = units;
     }

     /**
      * NOTE(tyler):
      *   I noticed you use the same normalization regexp for
      *   this and driver. You could have separated out string formatting into
      *   a separate module. Not strictly necessary for a project this size
      *   but good practice early on to reduce repeated logic when it makes sense.
      */
     get normalizedAddress() {
          this.normalizedName = this.name.replace(/[^a-zA-Z]/g, ""); // replaces all non alpha character
          this.units.forEach((unit) => {
               this.normalizedName = this.normalizedName.replace(unit, "");
          });
          return this.normalizedName;
     }
};
